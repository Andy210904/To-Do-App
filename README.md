# EaseLearn To-Do App

A clean and simple **To-Do List App** built using **React Native (Expo)**. The app allows users to manage daily tasks efficiently with **Create, Read, Update, and Delete (CRUD)** functionality, task filters, and data persistence using **AsyncStorage**.

---

## Features

- Add new tasks with a **title** and optional **description**
- Edit existing tasks by loading them into the input fields
- Delete tasks
- Toggle task completion status using a checkbox
- Filter tasks based on status: **All / Completed / Pending**
- Persistent storage using **AsyncStorage**
- Responsive and mobile-friendly design

---

## Tech Stack

| Technology      | Description                                 |
|-----------------|---------------------------------------------|
| React Native    | Framework for building native mobile apps   |
| Expo            | Toolchain for React Native development      |
| AsyncStorage    | Persistent key-value storage for tasks      |    
---


## How It Works

1. User inputs a task **title** and optional **description**
2. On clicking **Add Task**, the task is added to the list
3. Each task can be **marked complete**, **edited**, or **deleted**
4. Tasks are **saved locally** using AsyncStorage
5. The app loads previous tasks automatically on startup

---

## How to Run the App

### 1. Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android/iOS Emulator **or** Expo Go App on mobile

### 2. Installation

```bash
git clone https://github.com/your-username/easelearn-todo-app.git
cd easelearn-todo-app
npm install

```
### 3. Run the App
```bash
npx expo start
```
- Scan the QR code in Expo Go on your phone OR
- Press a to open Android emulator OR
- Press i for iOS simulator
- For simulator please ensure that the virtual device is running in the background


### Contribution
Pull requests and suggestions are welcome!

### License
This project is licensed for learning/demo purposes. Feel free to fork and improve it.

### Author
Aditya Dhane

