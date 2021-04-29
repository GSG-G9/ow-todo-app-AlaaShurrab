import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from "../styles/Todos.module.css";

const style = {
  borderBottom: '1px solid gray',
  padding: '0.5rem 1rem',
  margin: '0px',
  backgroundColor: 'transparent', 
  cursor: 'pointer', 
  opacity: 1,
}

const Card = ({ toDo:{content,completed},index, moveCard,checkTodo}) => {
  const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type:'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
 return(
  <ul  ref={ref} data-handler-id={handlerId}  style={{ ...style, opacity }}>
    <li id="9" className={`${styles['card-list-item']} ${styles.ToDoItem}`}>
        <div className={styles.checkbox} onClick={checkTodo}>
          <div className={styles.round}>
            <input type="checkbox" id="checkbox" checked={completed} />
            <label for="checkbox"></label>
          </div>
          <p className={styles.textSpan}>{content}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="card_DeleteToDo__2YKiI">
          <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"></path>
        </svg>
    </li>
  </ul>
)};

export default Card;
