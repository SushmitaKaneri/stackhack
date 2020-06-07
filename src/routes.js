import React from 'react';
import Loadable from 'react-loadable'



function Loading() {
  return <div>Loading...</div>;
}

const Anaylsis = Loadable({
  loader: () => import('./views/Analysis'),
  loading: Loading,
});

const Add_Note = Loadable({
  loader: () => import('./views/Add_Note'),
  loading: Loading,
});

const Pinned = Loadable({
  loader: () => import('./views/Pinned'),
  loading: Loading,
});

const Bin = Loadable({
  loader: () => import('./views/Bin'),
  loading: Loading,
});

const Archive = Loadable({
  loader: () => import('./views/Archive'),
  loading: Loading,
});

const Reminder = Loadable({
  loader: () => import('./views/Reminder'),
  loading: Loading,
});

const Day = Loadable({
  loader: () => import('./views/Day'),
  loading: Loading,
});

const Labels = Loadable({
  loader: () => import('./views/Labels'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading,
});

const Forgot = Loadable({
  loader: () => import('./views/Pages/Login/Forgot'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name:'Dashboard', component: Dashboard},
  { path: '/login', exact: true,  name: 'Login', component: Login },
  { path: '/forgot', exact: true,  name: 'Forgot', component: Forgot },
  { path: '/register', exact: true,  name: 'Register', component: Register },
  { path: '/add_note', name: 'Add Note', component: Add_Note },
  { path: '/pinned', name: 'Pinned Notes', component: Pinned },
  { path: '/labels', name: 'Labels', component: Labels },
  { path: '/archive', name: 'Archive', component: Archive },
  { path: '/bin', name: 'Bin', component: Bin },
  { path: '/reminder', name: 'Reminder', component: Reminder },
  { path: '/day', name: 'My Day', component: Day },
  { path: '/analysis', name: 'Analysis', component: Anaylsis }
];

export default routes;
