import { useState } from 'react';
import { useGame } from './context/GameContext';
import Layout from './components/Layout';
import DashboardView from './views/DashboardView';
import QuestView from './views/QuestView';
import BossView from './views/BossView';
import StatsView from './views/StatsView';
import InnerCombatView from './views/InnerCombatView';
import OnboardingView from './views/OnboardingView';
import LevelUpOverlay from './components/LevelUpOverlay';
import FocusOverlay from './components/FocusOverlay';
import SystemAlertOverlay from './components/SystemAlertOverlay';

function App() {
  const { user, tasks, systemAlert } = useGame();
  const [activeTab, setActiveTab] = useState('home');

  if (!user.onboardingComplete) {
    return <OnboardingView />;
  }

  // Check for pending tasks to show focus overlay
  const hasPendingTasks = tasks.some(t => !t.completed);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <DashboardView />;
      case 'quests': return <QuestView />;
      case 'combat': return <InnerCombatView />;
      case 'boss': return <BossView />;
      case 'stats': return <StatsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <LevelUpOverlay />
        {renderContent()}
      </Layout>
      
      {/* High-priority system overlays */}
      {hasPendingTasks && <FocusOverlay />}
      {systemAlert && <SystemAlertOverlay />}
    </>
  );
}

export default App;
