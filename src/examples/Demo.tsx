import { StatsCard } from "compositions";
import {
  IconBarChart,
  IconBell,
  IconCalendar,
  IconCheckCircle,
  IconCreditCard,
  IconDollarSign,
  IconHome,
  IconLayers,
  IconLogIn,
  IconLogOut,
  IconMessageCircle,
  IconPieChart,
  IconPlus,
  IconRefreshCw,
  IconSend,
  IconTrendingUp,
  IconUser,
} from "icons";
import {
  Button,
  IconButton,
  InputField,
  Navigation,
  NavigationButton,
  Notification,
  Tag,
  Text,
  TextStrong,
  type IconProps,
} from "primitives";
import { TextHeading } from "primitives";
import { useMemo, useState, type ComponentType } from "react";
import "./Demo.css";

type TrendPoint = {
  label: string;
  assets: number;
  liabilities: number;
  netWorth: number;
};

type Route = "dashboard" | "spending" | "bills" | "assistant";
const NAV_ITEMS: { id: Route; label: string; icon: ComponentType<IconProps> }[] = [
  { id: "dashboard", label: "Dashboard", icon: IconHome },
  { id: "spending", label: "Spending", icon: IconPieChart },
  { id: "bills", label: "Bills", icon: IconCalendar },
  { id: "assistant", label: "AI Assistant", icon: IconMessageCircle },
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

const SPENDING_CATEGORIES = [
  { label: "Housing", value: 2400, color: "var(--sds-color-background-brand-default)" },
  { label: "Food", value: 930, color: "#0F9B8E" },
  { label: "Transport", value: 420, color: "#7C5CFF" },
  { label: "Subscriptions", value: 190, color: "var(--sds-color-background-warning-default)" },
  { label: "Shopping", value: 640, color: "var(--sds-color-background-danger-default)" },
];

const UPCOMING_BILLS = [
  { id: "rent", name: "Rent", due: "Jun 21", amount: 2200, status: "Due in 5 days" },
  { id: "power", name: "Power Co.", due: "Jun 24", amount: 142, status: "Due in 8 days" },
  { id: "internet", name: "Fiber Internet", due: "Jun 27", amount: 79, status: "Due in 11 days" },
];

const AI_INSIGHTS = [
  "Dining spend is 18% above your 3-month average.",
  "401(k) contribution pace keeps you on track for your annual target.",
  "You have $1,240 in idle cash that could move to HYSA.",
];

export function Demo() {
  const assetTotal = 390000;
  const liabilityTotal = 182000;
  const netWorth = assetTotal - liabilityTotal;
  const [route, setRoute] = useState<Route>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<string[]>([
    "Hi Rob, I reviewed your accounts. Want a 30-day savings plan?",
  ]);

  const spendingTotal = useMemo(
    () => SPENDING_CATEGORIES.reduce((sum, item) => sum + item.value, 0),
    [],
  );

  if (!isAuthenticated) {
    return (
      <section className="nestegg-shell nestegg-auth-shell">
        <div className="nestegg-auth-card">
          <div className="nestegg-auth-brand">
            <Tag variant="secondary">Secure Sign In</Tag>
            <TextHeading elementType="h1">Welcome back to Nestegg</TextHeading>
            <Text elementType="p" className="nestegg-subtle">
              Sign in to view your complete financial profile.
            </Text>
          </div>

          <div className="nestegg-auth-actions">
            <Button
              className="nestegg-auth-google"
              onPress={() => { setIsAuthenticated(true); setIsGoogleLinked(true); }}
            >
              <IconLogIn size="16" />
              Continue with Google
            </Button>

            <div className="nestegg-auth-divider">
              <span />
              <Text elementType="span" className="nestegg-subtle">or use email</Text>
              <span />
            </div>

            <div className="nestegg-auth-form">
              <InputField label="Email address" placeholder="you@domain.com" />
              <InputField label="Password" placeholder="••••••••" />
              <Button variant="neutral" onPress={() => setIsAuthenticated(true)}>
                Sign in with email
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sendMessage = () => {
    if (!chatInput.trim()) {
      return;
    }
    setMessages((previous) => [
      ...previous,
      chatInput.trim(),
      "I can help with that. I drafted a recommendation based on your cash flow and upcoming bills.",
    ]);
    setChatInput("");
  };

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
                  isSelected={item.id === route}
                  direction="row"
                  onPress={() => setRoute(item.id)}
                >
                  {item.label}
                </NavigationButton>
              );
            })}
          </Navigation>

          <Button className="nestegg-signout" onPress={() => setIsAuthenticated(false)}>
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
              <Button
                variant="subtle"
                onPress={() => setIsLinked((value) => !value)}
              >
                <IconRefreshCw size="16" />
                {isLinked ? "Accounts linked" : "Link accounts"}
              </Button>
              <IconButton aria-label="Notifications" variant="primary" onPress={() => {}}>
                <IconBell size="16" />
              </IconButton>
            </div>
          </header>

          <div className="nestegg-scroll-region">
            <div className="nestegg-content">
              {showAlert && (
                <Notification className="nestegg-notification" variant="alert">
                  <TextStrong elementType="span">Upcoming bill alert:</TextStrong>{" "}
                  Credit card payment due in 2 days.
                  <Button variant="subtle" onPress={() => setShowAlert(false)}>
                    Dismiss
                  </Button>
                </Notification>
              )}

              {route === "dashboard" && (
                <>
                  <div className="nestegg-stats">
                    <StatsCard stat={`$${assetTotal.toLocaleString()}`} description="Assets" icon={<IconDollarSign size="24" />} />
                    <StatsCard stat={`$${liabilityTotal.toLocaleString()}`} description="Liabilities" icon={<IconCreditCard size="24" />} />
                    <StatsCard stat={`$${netWorth.toLocaleString()}`} description="Net Worth" icon={<IconLayers size="24" />} />
                  </div>
                  <div className="nestegg-dashboard-grid">
                    <ChartCard
                      title="Net Worth"
                      subtitle="Tracking on home dashboard (PRD 4.5.4)"
                      badge="12 mo"
                      points={TREND}
                      lines={[
                        { key: "netWorth", color: "var(--sds-color-background-positive-default)", label: "Net Worth" },
                        { key: "assets", color: "var(--sds-color-background-brand-default)", label: "Assets" },
                        { key: "liabilities", color: "var(--sds-color-background-danger-default)", label: "Liabilities" },
                      ]}
                    />
                    <DashboardPanel
                      title="Cash Flow Summary"
                      subtitle="Income vs spending this month"
                      action={
                        <Tag scheme="positive" variant="secondary">
                          +$2,140
                        </Tag>
                      }
                    >
                      <div className="nestegg-kpi-row">
                        <Kpi label="Income" value="$8,460" icon={<IconTrendingUp size="16" />} />
                        <Kpi label="Spent" value="$6,320" icon={<IconBarChart size="16" />} />
                      </div>
                    </DashboardPanel>
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
                    <DashboardPanel title="AI Insight Feed" subtitle="Updated daily">
                      <ul className="nestegg-list">
                        {AI_INSIGHTS.map((item) => (
                          <li key={item}>
                            <IconMessageCircle size="14" />
                            <Text elementType="span">{item}</Text>
                          </li>
                        ))}
                      </ul>
                    </DashboardPanel>
                  </div>
                </>
              )}

              {route === "spending" && (
                <div className="nestegg-panel">
                  <div className="nestegg-panel-head">
                    <TextHeading elementType="h2">Spending Analytics</TextHeading>
                    <Tag variant="secondary">Total ${spendingTotal.toLocaleString()}</Tag>
                  </div>
                  <div className="nestegg-bars">
                    {SPENDING_CATEGORIES.map((category) => (
                      <div key={category.label} className="nestegg-bar-row">
                        <Text elementType="span">{category.label}</Text>
                        <div className="nestegg-bar-track">
                          <div
                            className="nestegg-bar-fill"
                            style={{
                              width: `${(category.value / spendingTotal) * 100}%`,
                              background: category.color,
                            }}
                          />
                        </div>
                        <TextStrong elementType="span">${category.value}</TextStrong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {route === "bills" && (
                <div className="nestegg-panel">
                  <div className="nestegg-panel-head">
                    <TextHeading elementType="h2">Bill Calendar (30 days)</TextHeading>
                    <Button variant="neutral">
                      <IconPlus size="16" />
                      Add Bill
                    </Button>
                  </div>
                  <div className="nestegg-list-card-grid">
                    {UPCOMING_BILLS.map((bill) => (
                      <article key={bill.id} className="nestegg-mini-card">
                        <TextStrong elementType="p">{bill.name}</TextStrong>
                        <Text elementType="p" className="nestegg-subtle">
                          Due {bill.due}
                        </Text>
                        <TextHeading elementType="p">${bill.amount}</TextHeading>
                        <Tag variant="secondary">{bill.status}</Tag>
                        <Button variant="subtle">
                          <IconCheckCircle size="16" />
                          Pay now
                        </Button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {route === "assistant" && (
                <div className="nestegg-panel nestegg-assistant-panel">
                  <div className="nestegg-panel-head">
                    <TextHeading elementType="h2">Financial Assistant</TextHeading>
                    <Tag variant="secondary">{isGoogleLinked ? "Google linked" : "Session active"}</Tag>
                  </div>
                  <div className="nestegg-chat-log">
                    {messages.map((message, index) => (
                      <p key={`${message}-${index}`} className={index % 2 === 0 ? "nestegg-chat-ai" : "nestegg-chat-user"}>
                        {index % 2 === 0 ? <IconUser size="14" /> : <IconMessageCircle size="14" />}
                        {message}
                      </p>
                    ))}
                  </div>
                  <div className="nestegg-chat-compose">
                    <InputField
                      aria-label="Ask assistant"
                      placeholder="Ask: How much did I spend on dining last month?"
                      value={chatInput}
                      onChange={setChatInput}
                    />
                    <Button onPress={sendMessage}>
                      <IconSend size="16" />
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

function DashboardPanel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="nestegg-panel">
      <div className="nestegg-panel-head">
        <div>
          <TextHeading elementType="h2">{title}</TextHeading>
          {subtitle && (
            <Text elementType="p" className="nestegg-subtle">
              {subtitle}
            </Text>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Kpi({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="nestegg-kpi">
      <span>{icon}</span>
      <Text elementType="p" className="nestegg-subtle">
        {label}
      </Text>
      <TextStrong elementType="p">{value}</TextStrong>
    </article>
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
