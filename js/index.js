/** @format */

const root = document.getElementById("root");
const title_modal = document.getElementById("title_modal");
const modal_delete_all_tasks = document.getElementById(
  "modal_delete_all_tasks"
);
const btn_go_back = document.getElementById("btn_go_back");
const btn_yes = document.getElementById("btn_yes");
const btn_no = document.getElementById("btn_no");

const conten_tasks = document.getElementById("conten_tasks");
const form_task = document.getElementById("form_task");
const conten_input_text = document.getElementById("conten_input_text");
const locator_delete_all_tasks = document.getElementById("delete_all_tasks");
const show_tasks = document.getElementById("show_tasks");
const hide_tasks = document.getElementById("hide_tasks");

let arr_tasks = [];

const sendLs = () => {
  localStorage.setItem("task", JSON.stringify(arr_tasks));
  show_task();
};
const get_info = (title) => {
  let info = {
    title,
    state: false,
    state_task: "Pending",
  };
  arr_tasks.push(info);
  return info;
};
const update_task_true = (taskTitle) => {
  let indexTask = arr_tasks.findIndex((Element) => Element.title === taskTitle);
  arr_tasks[indexTask].state = true;
  arr_tasks[indexTask].state_task = "Complete";
  sendLs();
};
const update_task_false = (taskTitle) => {
  let indexTask = arr_tasks.findIndex((Element) => Element.title === taskTitle);
  arr_tasks[indexTask].state = false;
  arr_tasks[indexTask].state_task = "Pending";
  sendLs();
};
const delete_task = (taskTitle) => {
  let indexTask = arr_tasks.findIndex((Element) => Element.title === taskTitle);
  arr_tasks.splice(indexTask, 1);
  sendLs();
};
const delete_all_tasks = () => {
  arr_tasks = [];
  sendLs();
};
const show_task = () => {
  let arr_tasks = JSON.parse(localStorage.getItem("task"));
  conten_tasks.innerHTML = "";

  arr_tasks.forEach((task) => {
    if (task.state === true) {
      const card_task = document.createElement("div");
      card_task.className = "card-task complete";

      const conten_title = document.createElement("div");
      conten_title.className = "conten-title";

      const title = document.createElement("span");
      title.innerText = task.title;

      const task_state = document.createElement("span");
      task_state.innerText = task.state_task;

      const conten_icon = document.createElement("div");
      conten_icon.className = "conten-icon";

      const icon_check = document.createElement("i");
      icon_check.className = "bi bi-check2-circle";
      icon_check.id = "icon_check_check";

      const icon_trash = document.createElement("i");
      icon_trash.className = "bi bi-trash3";
      icon_trash.id = "icon_trash";

      conten_title.append(title);

      conten_icon.append(icon_check);
      conten_icon.append(icon_trash);

      card_task.append(conten_title);
      card_task.append(task_state);
      card_task.append(conten_icon);

      conten_tasks.append(card_task);
    } else {
      const card_task = document.createElement("div");
      card_task.className = "card-task";

      const conten_title = document.createElement("div");
      conten_title.className = "conten-title";

      const title = document.createElement("span");
      title.innerText = task.title;

      const task_state = document.createElement("span");
      task_state.innerText = task.state_task;

      const conten_icon = document.createElement("div");
      conten_icon.className = "conten-icon";

      const icon_check = document.createElement("i");
      icon_check.className = "bi bi-check-lg";
      icon_check.id = "icon_check_pending";

      const icon_trash = document.createElement("i");
      icon_trash.className = "bi bi-trash3";
      icon_trash.id = "icon_trash";

      conten_title.append(title);

      conten_icon.append(icon_check);
      conten_icon.append(icon_trash);

      card_task.append(conten_title);
      card_task.append(task_state);
      card_task.append(conten_icon);

      conten_tasks.append(card_task);
    }
  });
};
const show_modal = () => {
  modal_delete_all_tasks.classList.add("show");
};
document.addEventListener("DOMContentLoaded", show_task);

form_task.addEventListener("submit", (e) => {
  let input_text = document.getElementById("input_text");
  const regexpCoordinates = !/^([0-9])*$/;
  e.preventDefault();
  if (input_text.value == "") {
    input_text.placeholder = "The field can't be empty";
    input_text.classList.add("error-p-h");
    conten_input_text.classList.add("error");
  } else if (/^([0-9])*$/.test(input_text.value)) {
    input_text.placeholder = "Only text strings are allowed";
    input_text.classList.add("error-p-h");
    conten_input_text.classList.add("error");
    form_task.reset();
  } else if (input_text.value.length > 20) {
    input_text.placeholder = "The task can't be longer than 20 characters";
    input_text.classList.add("error-p-h");
    conten_input_text.classList.add("error");
    form_task.reset();
  }
  if (!input_text.value == "" || regexpCoordinates.test(input_text.value)) {
    get_info(input_text.value);
    sendLs();
    show_task();
    form_task.reset();
    input_text.placeholder = "Describe your task";
    conten_input_text.classList.remove("error");
    input_text.classList.remove("error-p-h");
    location.reload();
  }
});

conten_tasks.addEventListener("click", (e) => {
  const id_icon_check = e.composedPath()[0].id;
  const id_icon_trash = e.composedPath()[0].id;
  const title_task = e.composedPath()[2].childNodes[0].childNodes[0].innerText;

  if (id_icon_check === "icon_check_pending") {
    update_task_true(title_task);
  }
  if (id_icon_check === "icon_check_check") {
    update_task_false(title_task);
  }
  if (id_icon_trash === "icon_trash") {
    delete_task(title_task);
    location.reload();
  }
});

locator_delete_all_tasks.addEventListener("click", () => {
  let arr_tasks = JSON.parse(localStorage.getItem("task"));

  if (arr_tasks.length === 0) {
    btn_yes.classList.add("hide");
    btn_no.classList.add("hide");
    title_modal.innerText = "You don't have tasks to delete!";
    btn_go_back.classList.add("show");
    show_modal();
  }
  if (arr_tasks.length > 0) {
    btn_go_back.classList.add("hide");
    show_modal();
  }
});

hide_tasks.addEventListener("click", () => {
  conten_tasks.classList.remove("show");
  conten_tasks.classList.add("hide");
});

show_tasks.addEventListener("click", () => {
  conten_tasks.classList.remove("hide");
  conten_tasks.classList.add("show");
});

modal_delete_all_tasks.addEventListener("click", (e) => {
  let id_option = e.composedPath()[0].id;

  if (id_option === "btn_yes") {
    delete_all_tasks();
    modal_delete_all_tasks.classList.remove("show");
    location.reload();
  }
  if (id_option === "btn_no" || id_option === "btn_go_back") {
    modal_delete_all_tasks.classList.remove("show");
  }
});
