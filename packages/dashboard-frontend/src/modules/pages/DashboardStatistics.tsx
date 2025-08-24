import React, { useEffect } from 'react';
import { ApiProvider, useApi } from '../api/api';
import { useWs } from '../ws/WebSocketProvider';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, Zap } from 'lucide-react';

function Content() {
  const { initial } = useWs();
  const { specs, approvals, reloadAll } = useApi();
  const { info } = useApi();
  const { t } = useTranslation();

  useEffect(() => {
    reloadAll();
  }, [reloadAll]);
  
  useEffect(() => {
    if (!initial) reloadAll();
  }, [initial, reloadAll]);

  const totalSpecs = specs.length;
  const totalTasks = specs.reduce((acc, s) => acc + (s.taskProgress?.total || 0), 0);
  const completedTasks = specs.reduce((acc, s) => acc + (s.taskProgress?.completed || 0), 0);
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const taskSummary = totalSpecs > 0
    ? `${totalTasks} ${t('tasks.title')} ${t('statistics.across')} ${totalSpecs} ${t('specs.title')}${totalSpecs === 1 ? '' : 's'}`
    : t('specs.noSpecs');

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold mb-1">
                {info?.projectName || t('dashboard.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('statistics.title')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Specs Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              {t('specs.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{totalSpecs}</div>
            <p className="text-xs text-muted-foreground">{t('statistics.totalSpecs')}</p>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              {t('tasks.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-2">
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-lg text-muted-foreground">/ {totalTasks}</div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{taskSummary}</p>
            <Progress value={taskCompletionRate} className="h-2" />
          </CardContent>
        </Card>

        {/* Approvals Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {approvals.length > 0 ? (
                <Clock className="h-4 w-4 text-amber-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              {t('approvals.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold mb-1 ${approvals.length > 0 ? 'text-amber-600' : ''}`}>
              {approvals.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {approvals.length > 0 ? t('statistics.pendingApprovals') : t('approvals.noApprovals')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Card */}
      <Card>
        <CardContent className="pt-8 text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">{t('statistics.moreFeaturesComingSoon')}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
            {t('statistics.workingOnAdditionalAnalytics')}
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button asChild variant="destructive" size="sm">
              <a
                href="https://www.npmjs.com/package/@specflow/spec-workflow-mcp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('statistics.npmPackage')}
              </a>
            </Button>

            <Button asChild variant="secondary" size="sm">
              <a
                href="https://github.com/Pimzino/spec-workflow-mcp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('statistics.github')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export function DashboardStatistics() {
  const { initial } = useWs();
  return (
    <ApiProvider initial={initial}>
      <Content />
    </ApiProvider>
  );
}