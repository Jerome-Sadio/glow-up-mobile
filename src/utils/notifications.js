import { LocalNotifications } from '@capacitor/local-notifications';

export const scheduleReminders = async (pendingTasks) => {
  try {
    if (pendingTasks.length === 0) {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }] });
      return;
    }

    const { display } = await LocalNotifications.checkPermissions();
    if (display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }

    // Schedule annoying reminders
    // We REMOVE the custom sound for now to prevent native crashes if the file is missing
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "SYSTÈME : RAPPEL CRITIQUE",
          body: "Stagnation détectée. Complète tes quêtes pour éviter les sanctions !",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 2) }, // In 2 hours
          extra: { type: 'reminder' }
        },
        {
          title: "ALERTE SYSTÈME",
          body: "Quêtes en attente. Ta santé (SAN) diminue si tu ne fais rien.",
          id: 2,
          schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 6) }, // In 6 hours
          extra: { type: 'reminder' }
        },
        {
          title: "DERNIER AVERTISSEMENT",
          body: "Si tu n'agis pas maintenant, une pénalité de niveau sera appliquée.",
          id: 3,
          schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 12) }, // In 12 hours
          extra: { type: 'penalty_warning' }
        }
      ]
    });
  } catch (error) {
    // If notifications fail (permission denied or resource missing), we log it but don't crash the app
    console.error('Notification scheduling failed:', error);
  }
};
