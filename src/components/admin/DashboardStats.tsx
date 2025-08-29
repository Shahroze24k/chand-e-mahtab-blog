interface DashboardStatsProps {
  stats: {
    totalPosts: number;
    totalComments: number;
    pendingComments: number;
    publishedPosts: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Posts',
      titleUr: 'کل مضامین',
      value: stats.totalPosts,
      color: '#0B5D1E',
      icon: '📝',
    },
    {
      title: 'Published',
      titleUr: 'شائع شدہ',
      value: stats.publishedPosts,
      color: '#F4C430',
      icon: '✅',
    },
    {
      title: 'Comments',
      titleUr: 'تبصرے',
      value: stats.totalComments,
      color: '#0B5D1E',
      icon: '💬',
    },
    {
      title: 'Pending',
      titleUr: 'زیر التواء',
      value: stats.pendingComments,
      color: stats.pendingComments > 0 ? '#dc3545' : '#6c757d',
      icon: '⏳',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border-l-4"
          style={{ borderLeftColor: stat.color }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'rgba(20, 34, 28, 0.6)' }}>
                {stat.title}
              </p>
              <p className="font-urdu text-xs rtl mt-1" style={{ color: 'rgba(20, 34, 28, 0.5)' }}>
                {stat.titleUr}
              </p>
              <p className="text-3xl font-bold mt-2" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
