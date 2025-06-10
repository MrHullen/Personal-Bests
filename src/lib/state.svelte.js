export const person = $state({
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
})

export const bests = $state({
  olympicLifts: [
    {
      type: 'Clean',
      weight: 0,
    },
    {
      type: 'Snatch',
      weight: 0,
    },
    {
      type: 'Jerk',
      weight: 0,
    },
  ],
  powerlifts: [
    {
      type: 'Squat',
      weight: 0,
    },
    {
      type: 'Deadlift',
      weight: 0,
    },
    {
      type: 'Bench',
      weight: 0,
    },
  ],
  other: [],
})
