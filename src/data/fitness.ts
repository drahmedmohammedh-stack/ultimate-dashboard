export interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  exercises: string[];
}

export const fitnessData = {
  weeklyWorkouts: 4,
  weeklyGoal: 5,
  currentStreak: 12,
  totalWorkoutsThisMonth: 16,
  weekSchedule: [
    { day: 'Monday', type: 'Push Day', completed: true },
    { day: 'Tuesday', type: 'Pull Day', completed: true },
    { day: 'Wednesday', type: 'Rest / Cardio', completed: true },
    { day: 'Thursday', type: 'Leg Day', completed: true },
    { day: 'Friday', type: 'Upper Body', completed: false },
    { day: 'Saturday', type: 'Active Recovery', completed: false },
    { day: 'Sunday', type: 'Rest', completed: false },
  ],
  recentWorkouts: [
    {
      id: '1',
      date: 'Today',
      type: 'Leg Day',
      duration: 65,
      calories: 520,
      exercises: ['Squats 4x8', 'Leg Press 3x12', 'Romanian Deadlifts 3x10', 'Calf Raises 4x15'],
    },
    {
      id: '2',
      date: 'Yesterday',
      type: 'Rest / Cardio',
      duration: 30,
      calories: 280,
      exercises: ['Treadmill Run 20min', 'Stretching 10min'],
    },
    {
      id: '3',
      date: 'Mar 13',
      type: 'Pull Day',
      duration: 58,
      calories: 480,
      exercises: ['Deadlifts 4x6', 'Pull-ups 3x10', 'Barbell Rows 3x10', 'Bicep Curls 3x12'],
    },
    {
      id: '4',
      date: 'Mar 12',
      type: 'Push Day',
      duration: 62,
      calories: 510,
      exercises: ['Bench Press 4x8', 'OHP 3x10', 'Incline DB Press 3x10', 'Tricep Dips 3x12'],
    },
  ] as Workout[],
  monthlyStats: {
    totalWorkouts: 16,
    totalMinutes: 890,
    avgDuration: 56,
    totalCalories: 7200,
  },
  bodyStats: {
    weight: 178,
    weightChange: -2.5,
    bodyFat: 14.2,
    bodyFatChange: -0.8,
  },
};
