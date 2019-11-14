import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'onShow'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }
  changeInputMode(id, mode) {
    this.props.changeValMode(id, mode);
  }
  deleteItem(id) {
    this.props.deleteOneById(id);
  }
  completeItem(id) {
    this.props.completeOneById(id);
  }

  showResulData(data, type) {
    if (type === 'active') {
      return data.filter(item => {
        return item.isCompleted === false;
      });
    }
    if (type === 'completed') {
      return data.filter(item => {
        return item.isCompleted === true;
      });
    }
    return data;
  }
  render() {
    const { data, type } = this.props;
    const result = this.showResulData(data, type);

    return (
      <ul className="todo-list">
        {result.map(item => (
          <li
            className={item.isCompleted === true ? 'completed' : ''}
            key={item.id}
          >
            {item.mode === 'onShow' ? (
              <div className="view">
                <input
                  onClick={this.completeItem.bind(this, item.id)}
                  className="toggle"
                  type="checkbox"
                  defaultChecked={item.isCompleted ? 'checked' : ''}
                />
                <label
                  onDoubleClick={() => this.changeInputMode(item.id, item.mode)}
                >
                  {item.name}
                </label>
                <button
                  className="destroy"
                  onClick={this.deleteItem.bind(this, item.id)}
                ></button>
              </div>
            ) : (
              'Loading...'
            )}

            {item.mode === 'onEdit' ? (
              <input
                className="edit"
                style={{ display: 'block' }}
                value={item.name}
                onChange={e => this.props.editItemById(item.id, e.target.value)}
                onBlur={() => this.props.fnishEdit(item.id)}
              />
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    );
  }
}
TodoList.propTypes = {
  data: PropTypes.array.isRequired
};
export default TodoList;
