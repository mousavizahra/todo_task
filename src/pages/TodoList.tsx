import  {  SetStateAction, useEffect, useState } from 'react';
import { Input, Button, List, Typography, Modal, Alert, message } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, editTodo } from '../redux/slice/todo';
import { RootState } from '../redux/store/store';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const TodoList: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const user = useSelector((state: RootState) => state.user.user);

  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null); // Track the todo being edited

  // State for managing alert message
  const [showAlert, setShowAlert] = useState(false);

  //#region User Navigated from sign up
  useEffect(() => {
    // Check if the user navigated from signup page
    if (location.state?.fromSignup) {
      setShowAlert(true); // Show alert on first load after signup
      message.success(`Signup successful! Welcome ${user?.username}!`);
    }
  }, [location, user]);
  //#endregion

  //#region Todo Items Data Manipulation Functions
  /**
   * Handles the Add Todo Item functionality
   */
  const handleAddTodo = () => {
    if (text.trim()) {
      if (user) {
        dispatch(addTodo({ id: Date.now(), text, completed: false, username: user?.username }));
      }
      setText('');
    }
  };

  /**
   * Handles the Edit Todo Item functionality
   */
  const handleEditTodo = (id: number) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
      setEditingId(null); // Exit edit mode
      setEditText(''); // Reset input field
    }
  };

  /**
   * Handles the Cancel Edit Todo Item functionality
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText(''); // Reset edit input when canceling
  };
  //#endregion

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
      <Title level={3} style={{ textAlign: 'center' }}>To do's List</Title>
      <Input
        placeholder="New To do"
        value={text}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)}
        onPressEnter={handleAddTodo}
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" block onClick={handleAddTodo} style={{ marginBottom: '20px' }}>
        Add
      </Button>

      <List
        bordered
        dataSource={todos.filter(item => item.username === user?.username)}
        renderItem={todo => (
          <List.Item
            onClick={() => dispatch(toggleTodo(todo.id))}
            actions={[
              editingId === todo.id ? (
                <>
                  <Button
                    type="link"
                    icon={<SaveOutlined />}
                    onClick={() => handleEditTodo(todo.id)}
                  />
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={handleCancelEdit}
                  />
                </>
              ) : (
                <>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => { setEditingId(todo.id); setEditText(todo.text); }}
                  />
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  />
                </>
              )
            ]}
          >
            {editingId === todo.id ? (
              <Input
                value={editText}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEditText(e.target.value)}
              />
            ) : (
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            )}
          </List.Item>
        )}
      />

      {/* Modal Alert for Success Message */}
      <Modal
        title="Signup Successful"
        visible={showAlert}
        footer={null}
        onCancel={() => setShowAlert(false)}
      >
        <Alert message={`Welcome ${user?.username}!`} type="success" showIcon />
      </Modal>
    </div>
  );
};

export default TodoList;
