import { StatsCard } from "compositions";
import {
  IconBarChart,
  IconBell,
  IconCreditCard,
  IconDollarSign,
  IconHome,
  IconLayers,
  IconLogOut,
  IconPlus,
} from "icons";
import { Button, IconButton, Navigation, NavigationButton, Text, TextStrong, type IconProps } from "primitives";
import { TextHeading } from "primitives";
import { type ComponentType } from "react";
import "./Demo.css";

type TrendPoint = {
  label: string;
  assets: number;
  liabilities: number;
  netWorth: number;
};

type Route = "dashboard" | "assets" | "liabilities" | "investments" | "calculator";
const NAV_ITEMS: { id: Route; label: string; icon: ComponentType<IconProps> }[] = [
  { id: "dashboard", label: "Dashboard", icon: IconHome },
  { id: "assets", label: "Assets", icon: IconDollarSign },
  { id: "liabilities", label: "Liabilities", icon: IconCreditCard },
  { id: "investments", label: "Investments", icon: IconBarChart },
  { id: "calculator", label: "Calculator", icon: IconPlus },
];

const TREND: TrendPoint[] = [
  { label: "Jun", assets: 286, liabilities: 134, netWorth: 152 },
  { label: "Jul", assets: 294, liabilities: 133, netWorth: 161 },
  { label: "Aug", assets: 299, liabilities: 132, netWorth: 167 },
  { label: "Sep", assets: 301, liabilities: 131, netWorth: 170 },
  { label: "Oct", assets: 303, liabilities: 131, netWorth: 172 },
  { label: "Nov", assets: 306, liabilities: 130, netWorth: 176 },
  { label: "Dec", assets: 312, liabilities: 129, netWorth: 183 },
  { label: "Jan", assets: 320, liabilities: 129, netWorth: 191 },
  { label: "Feb", assets: 326, liabilities: 128, netWorth: 198 },
  { label: "Mar", assets: 328, liabilities: 128, netWorth: 200 },
  { label: "Apr", assets: 329, liabilities: 128, netWorth: 201 },
  { label: "May", assets: 331, liabilities: 127, netWorth: 204 },
];

export function Demo() {
  const assetTotal = 390000;
  const liabilityTotal = 182000;
  const netWorth = assetTotal - liabilityTotal;
  return (
    <section className="nestegg-shell">
      <div className="nestegg-app">
        <aside className="nestegg-sidebar">
          <div className="nestegg-brand">
            <TextStrong elementType="p">Nestegg</TextStrong>
            <Text elementType="p" className="nestegg-subtle">
              Personal finance
            </Text>
          </div>

          <Navigation direction="column" className="nestegg-navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavigationButton
                  key={item.id}
                  icon={<Icon size="20" />}
                  isSelected={item.id === "dashboard"}
                  direction="row"
                  onPress={() => {}}
                >
                  {item.label}
                </NavigationButton>
              );
            })}
          </Navigation>

          <Button className="nestegg-signout" onPress={() => {}}>
            <IconLogOut size="16" />
            Sign out
          </Button>
        </aside>

        <main className="nestegg-main">
          <header className="nestegg-header">
            <div>
              <Text elementType="p" className="nestegg-subtle">Good evening,</Text>
              <TextStrong elementType="p">Rob</TextStrong>
            </div>

            <div className="nestegg-header-actions">
              <IconButton aria-label="Notifications" variant="primary" onPress={() => {}}>
                <IconBell size="16" />
              </IconButton>
              <IconButton aria-label="Sign out quick action" variant="primary" onPress={() => {}}>
                <IconLogOut size="16" />
              </IconButton>
            </div>
          </header>

          <div className="nestegg-scroll-region">
            <div className="nestegg-content">
              <div className="nestegg-stats">
                <StatsCard stat={`$${assetTotal.toLocaleString()}`} description="Assets" icon={<IconDollarSign size="24" />} />
                <StatsCard stat={`$${liabilityTotal.toLocaleString()}`} description="Liabilities" icon={<IconCreditCard size="24" />} />
                <StatsCard stat={`$${netWorth.toLocaleString()}`} description="Net Worth" icon={<IconLayers size="24" />} />
              </div>
              <ChartCard
                title="Net Worth"
                subtitle="Trend across assets and liabilities"
                badge="12 mo"
                points={TREND}
                lines={[
                  { key: "netWorth", color: "var(--sds-color-background-positive-default)", label: "Net Worth" },
                  { key: "assets", color: "var(--sds-color-background-brand-default)", label: "Assets" },
                  { key: "liabilities", color: "var(--sds-color-background-danger-default)", label: "Liabilities" },
                ]}
              />
              <ChartCard
                title="Portfolio Performance"
                subtitle="401(k), IRA, and Roth over 12 months"
                badge="+11.4%"
                points={TREND}
                lines={[
                  { key: "netWorth", color: "#0F9B8E", label: "401(k)" },
                  { key: "assets", color: "#1A73E8", label: "IRA" },
                  { key: "liabilities", color: "#7C5CFF", label: "Roth" },
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

function ChartCard({
  title,
  subtitle,
  badge,
  points,
  lines,
}: {
  title: string;
  subtitle: string;
  badge: string;
  points: TrendPoint[];
  lines: { key: "assets" | "liabilities" | "netWorth"; color: string; label: string }[];
}) {
  const width = 760;
  const height = 220;
  const chartTop = 8;
  const chartBottom = height - 24;
  const chartLeft = 44;
  const chartRight = width - 8;
  const chartHeight = chartBottom - chartTop;
  const chartWidth = chartRight - chartLeft;
  const max = Math.max(...points.flatMap((point) => [point.assets, point.liabilities, point.netWorth]));
  const min = Math.min(...points.flatMap((point) => [point.assets, point.liabilities, point.netWorth]));
  const stepX = chartWidth / (points.length - 1);
  const mapY = (value: number) => chartBottom - ((value - min) / (max - min || 1)) * chartHeight;
  const yTicks = [0, 95, 190, 285, 380];

  const toPath = (values: number[]) =>
    values
      .map((value, index) => `${index === 0 ? "M" : "L"} ${chartLeft + index * stepX} ${mapY(value)}`)
      .join(" ");

  return (
    <section className="nestegg-chart-card">
      <div className="nestegg-chart-head">
        <div>
          <TextHeading elementType="p">{title}</TextHeading>
          <Text elementType="p" className="nestegg-subtle">
            {subtitle}
          </Text>
        </div>
        <TextStrong elementType="p" className="nestegg-badge">
          {badge}
        </TextStrong>
      </div>

      <svg className="nestegg-chart" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        {yTicks.map((tick, index) => {
          const y = chartBottom - (index / (yTicks.length - 1)) * chartHeight;
          return (
            <g key={tick}>
              <line x1={chartLeft} x2={chartRight} y1={y} y2={y} className="nestegg-grid-line" />
              <text x={chartLeft - 8} y={y + 4} className="nestegg-grid-label">
                {tick}k
              </text>
            </g>
          );
        })}
        {lines.map((line) => (
          <path
            key={line.key}
            d={toPath(points.map((point) => point[line.key]))}
            stroke={line.color}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>

      <div className="nestegg-chart-foot">
        <div className="nestegg-axis">
          {points.map((point) => (
            <Text key={point.label} elementType="span" className="nestegg-subtle">
              {point.label}
            </Text>
          ))}
        </div>
        <div className="nestegg-legend">
          {lines.map((line) => (
            <span key={line.key} className="nestegg-legend-item">
              <i style={{ backgroundColor: line.color }} />
              <Text elementType="span">{line.label}</Text>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
