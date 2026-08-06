import mongoose from 'mongoose';
import '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../routes/api.js';

/**
 * Seed the octofit_db database with sample data for OctoFit Tracker.
 */
async function seedDatabase() {
  try {
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.create([
      {
        name: 'Storm Squad',
        description: 'A high-energy team focused on sprint sessions and strength training.'
      },
      {
        name: 'Endurance Crew',
        description: 'A recovery-focused team that loves long runs and cycling challenges.'
      }
    ]);

    const users = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya@example.com',
        role: 'captain',
        teamId: teams[0]._id
      },
      {
        name: 'Lucas Rivera',
        email: 'lucas@example.com',
        role: 'member',
        teamId: teams[0]._id
      },
      {
        name: 'Zoe Patel',
        email: 'zoe@example.com',
        role: 'member',
        teamId: teams[1]._id
      },
      {
        name: 'Daniel Okafor',
        email: 'daniel@example.com',
        role: 'captain',
        teamId: teams[1]._id
      }
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] }, { new: true }),
      Team.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id, users[3]._id] }, { new: true })
    ]);

    await Activity.create([
      {
        userId: users[0]._id,
        type: 'run',
        duration: 35,
        distance: 6.2,
        calories: 420,
        date: new Date('2026-08-05')
      },
      {
        userId: users[2]._id,
        type: 'cycle',
        duration: 60,
        distance: 24,
        calories: 610,
        date: new Date('2026-08-05')
      },
      {
        userId: users[1]._id,
        type: 'strength',
        duration: 45,
        calories: 320,
        date: new Date('2026-08-06')
      }
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, score: 980, rank: 1, period: 'weekly' },
      { userId: users[2]._id, score: 940, rank: 2, period: 'weekly' },
      { userId: users[1]._id, score: 890, rank: 3, period: 'weekly' }
    ]);

    await Workout.create([
      {
        name: 'Morning Sprint Intervals',
        type: 'cardio',
        duration: 25,
        difficulty: 'intermediate',
        userId: users[0]._id
      },
      {
        name: 'Recovery Mobility Flow',
        type: 'mobility',
        duration: 20,
        difficulty: 'beginner',
        userId: users[3]._id
      },
      {
        name: 'Strength Circuit',
        type: 'strength',
        duration: 40,
        difficulty: 'advanced',
        userId: users[1]._id
      }
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
