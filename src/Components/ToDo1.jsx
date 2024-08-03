import { useState, useEffect } from "react";
const ToDo1 = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  // get todos when component mounts....
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    setCount(JSON.parse(localStorage.getItem("count")));
  }, []);

  // save todos when any change happen in todos....
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("count", count);
    }, 1000);
  }, [todos]);

  const handleOnClickAdd = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
      setCount(count + 1);
    }
  };
  const handleOnClickDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setCount(count - 1);
  };
  return (
    <>
      <div className="p-10 border w-3/4 m-auto mt-10 bg-slate-500 rounded-tl-full rounded-br-full">
        <div className="w-3/4 m-auto flex mb-8 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className=" py-5 outline-none text-white text-base rounded-s-full block w-3/4 px-12 bg-gray-700 "
            placeholder="Write Something Here ..."
          />
          <div
            onClick={handleOnClickAdd}
            className=" rounded-e-full px-8 py-5 text-baseline font-medium text-center text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-30 cursor-pointer"
          >
            Add
          </div>
        </div>

        <div className="flex justify-center mr-16 mb-8">
          <button className="px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-30 cursor-pointer">
            No of Items in Your List : {count}
          </button>
        </div>

        <ul className="grid grid-cols-3 gap-3 m-auto w-3/4">
          {Array.isArray(todos) && todos.map((item, index) => (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p className="mb-3 font-normal text-white" key={index}>
                {item}
              </p>
              <a
                onClick={() => handleOnClickDelete(index)}
                className="px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-30 cursor-pointer"
              >
                Delete
              </a>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo1;
