import { Router } from 'express';
import multer from 'multer';

// Importando Configurações
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

// Middlewares
import authMiddleware from './app/middlewares/auth';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notification', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;