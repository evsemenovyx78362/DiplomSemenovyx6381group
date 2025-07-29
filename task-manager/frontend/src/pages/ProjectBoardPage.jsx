import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, updateTask, reset, reorderTasks } from '../features/tasks/taskSlice';
import Spinner from '../components/Spinner';
import TaskCard from '../components/TaskCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columnsFromBackend = {
  'To Do': { name: 'К выполнению', items: [] },
  'In Progress': { name: 'В работе', items: [] },
  'Done': { name: 'Готово', items: [] },
};

const ProjectBoardPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks(projectId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, projectId]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
  
    // Обновляем статус задачи
    const updatedTask = { ...removed, status: destination.droppableId };
    dispatch(updateTask(updatedTask));
  
    if (source.droppableId !== destination.droppableId) {
      const destItems = [...destColumn.items];
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    } else {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      });
    }
  };

  if (isLoading) return <Spinner />;

  // Распределяем задачи по колонкам
  const columns = { ...columnsFromBackend };
  columns['To Do'].items = tasks.filter(task => task.status === 'To Do');
  columns['In Progress'].items = tasks.filter(task => task.status === 'In Progress');
  columns['Done'].items = tasks.filter(task => task.status === 'Done');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Доска задач</h1>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <DragDropContext onDragEnd={(result) => {
            if (!result.destination) return;
            const { source, destination, draggableId } = result;

            // Если задача осталась в той же колонке
            if (source.droppableId === destination.droppableId) return;

            // Оптимистичное обновление UI
            const taskToMove = tasks.find(t => t._id === draggableId);
            const updatedTasks = tasks.map(t => t._id === draggableId ? {...t, status: destination.droppableId} : t);
            dispatch(reorderTasks(updatedTasks));

            // Отправка запроса на сервер
            dispatch(updateTask({ ...taskToMove, status: destination.droppableId }));
        }}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 p-4 rounded-lg w-full ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`}
                  >
                    <h2 className="font-bold mb-4">{column.name}</h2>
                    {column.items.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 ${snapshot.isDragging ? 'opacity-80' : ''}`}
                          >
                            <TaskCard task={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default ProjectBoardPage;
