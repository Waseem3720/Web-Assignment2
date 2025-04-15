document.addEventListener('DOMContentLoaded', () => {
  console.log('Common JS loaded');
  // Placeholder for seat availability notifications
  if (window.location.pathname === '/student/dashboard') {
      // Simulate checking subscribed courses (could be enhanced with WebSocket)
      setInterval(() => {
          console.log('Checking for seat availability updates...');
      }, 60000); // Check every minute
  }
});