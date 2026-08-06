import { Router, type Request, type Response } from 'express';
import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const router = Router();

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, default: 'member' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    distance: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: 0 },
    period: { type: String, default: 'weekly' }
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, default: 'beginner' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export type TeamDocument = InferSchemaType<typeof teamSchema>;
export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const User = mongoose.model<UserDocument>('User', userSchema);
export const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);

const createCrudRoutes = <T extends { find: (...args: any[]) => any; create: (...args: any[]) => any; findById: (...args: any[]) => any; findByIdAndUpdate: (...args: any[]) => any; findByIdAndDelete: (...args: any[]) => any }>(model: T, resourceName: string) => {
  const resourceRouter = Router();

  resourceRouter.get('/', async (_req: Request, res: Response) => {
    try {
      const docs = await model.find().sort({ createdAt: -1 });
      res.json(docs);
    } catch (error) {
      res.status(500).json({ error: `Failed to list ${resourceName}` });
    }
  });

  resourceRouter.post('/', async (req: Request, res: Response) => {
    try {
      const doc = await model.create(req.body);
      res.status(201).json(doc);
    } catch (error) {
      res.status(400).json({ error: `Failed to create ${resourceName}` });
    }
  });

  resourceRouter.get('/:id', async (req: Request, res: Response) => {
    try {
      const doc = await model.findById(req.params.id);
      if (!doc) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      res.json(doc);
    } catch (error) {
      res.status(400).json({ error: `Failed to fetch ${resourceName}` });
    }
  });

  resourceRouter.put('/:id', async (req: Request, res: Response) => {
    try {
      const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      res.json(doc);
    } catch (error) {
      res.status(400).json({ error: `Failed to update ${resourceName}` });
    }
  });

  resourceRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return res.status(404).json({ error: `${resourceName} not found` });
      }
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: `Failed to delete ${resourceName}` });
    }
  });

  return resourceRouter;
};

router.use('/users', createCrudRoutes(User, 'user'));
router.use('/teams', createCrudRoutes(Team, 'team'));
router.use('/activities', createCrudRoutes(Activity, 'activity'));
router.use('/leaderboard', createCrudRoutes(Leaderboard, 'leaderboard entry'));
router.use('/workouts', createCrudRoutes(Workout, 'workout'));

export default router;
