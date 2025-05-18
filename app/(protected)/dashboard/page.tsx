'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Mock API function
const fetchDashboardData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    stats: [
      { id: 1, name: 'Total Users', value: '10,482' },
      { id: 2, name: 'Active Sessions', value: '2,845' },
      { id: 3, name: 'Revenue', value: '$45,231.89' },
      { id: 4, name: 'Conversion Rate', value: '12.5%' },
    ],
    recentActivity: [
      { id: 1, action: 'User signup', user: 'john@example.com', time: '2 minutes ago' },
      { id: 2, action: 'Purchase completed', user: 'sarah@example.com', time: '15 minutes ago' },
      { id: 3, action: 'Subscription renewed', user: 'mike@example.com', time: '1 hour ago' },
      { id: 4, action: 'Password changed', user: 'lisa@example.com', time: '3 hours ago' },
    ],
  };
};

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your application statistics and recent activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-7 w-16" />
                  </CardContent>
                </Card>
              ))
          : data?.stats.map(stat => (
              <Card key={stat.id}>
                <CardHeader className="pb-2">
                  <CardDescription>{stat.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed in your application</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
            </div>
          ) : (
            <div className="space-y-4">
              {data?.recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
