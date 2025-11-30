
const defaultConfig = {
    employee_name: "John Smith",
    employee_id: "EMP-2024-001",
    department: "Field Operations",
    background_color: "#f1f5f9",
    surface_color: "#ffffff",
    text_color: "#0f172a",
    primary_action_color: "#3b82f6",
    secondary_action_color: "#64748b",
    font_family: "system-ui",
    font_size: 16
};

// Sample performance data
const performanceData = {
    overallScore: 87,
    monthTrend: 5.2,
    assignedTasks: 32,
    completedTasks: 28,
    delayedSubmissions: 3,
    dataQuality: 94,
    monthlyGrowth: 8.5,
    threeMonthPerf: [75, 82, 87],
    consistencyScore: 91,
    rejectedSubmissions: 2,
    dataQualityIssues: 1,
    missedVisits: 1,
    currentRank: "Gold",
    promotionEligibility: 76,
    pointsToNext: 450,
    rewardPoints: 1450,
    monthlyBonus: 250,
    certificates: ["Excellence Award Q1 2024", "Top Performer Badge"],
    appreciationNotes: 3,
    weeklyPerformance: [
        { day: "Monday", score: 65 },
        { day: "Tuesday", score: 80 },
        { day: "Wednesday", score: 75 },
        { day: "Thursday", score: 90 },
        { day: "Friday", score: 85 },
        { day: "Saturday", score: 95 },
        { day: "Sunday", score: 88 }
    ]
};

async function init() {
    await window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });

    render();
}

async function onConfigChange(config) {
    const baseFont = config.font_size || defaultConfig.font_size;
    const customFont = config.font_family || defaultConfig.font_family;
    const baseFontStack = 'system-ui, -apple-system, sans-serif';

    document.body.style.background = config.background_color || defaultConfig.background_color;
    document.body.style.color = config.text_color || defaultConfig.text_color;
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
    document.body.style.fontSize = `${baseFont}px`;

    render();
}

function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    window.elementSdk.config.background_color = value;
                    window.elementSdk.setConfig({ background_color: value });
                }
            },
            {
                get: () => config.surface_color || defaultConfig.surface_color,
                set: (value) => {
                    window.elementSdk.config.surface_color = value;
                    window.elementSdk.setConfig({ surface_color: value });
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    window.elementSdk.config.text_color = value;
                    window.elementSdk.setConfig({ text_color: value });
                }
            },
            {
                get: () => config.primary_action_color || defaultConfig.primary_action_color,
                set: (value) => {
                    window.elementSdk.config.primary_action_color = value;
                    window.elementSdk.setConfig({ primary_action_color: value });
                }
            },
            {
                get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
                set: (value) => {
                    window.elementSdk.config.secondary_action_color = value;
                    window.elementSdk.setConfig({ secondary_action_color: value });
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                window.elementSdk.config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                window.elementSdk.config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["employee_name", config.employee_name || defaultConfig.employee_name],
        ["employee_id", config.employee_id || defaultConfig.employee_id],
        ["department", config.department || defaultConfig.department]
    ]);
}

function render() {
    const config = window.elementSdk?.config || defaultConfig;
    const baseFont = config.font_size || defaultConfig.font_size;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;

    const completionRate = Math.round((performanceData.completedTasks / performanceData.assignedTasks) * 100);
    const bestDay = performanceData.weeklyPerformance.reduce((max, day) => day.score > max.score ? day : max);
    const weakestDay = performanceData.weeklyPerformance.reduce((min, day) => day.score < min.score ? day : min);
    const isImprovement = performanceData.monthTrend > 0;
    const isTopPerformer = performanceData.consistencyScore >= 90;

    const rankEmoji = {
        Bronze: '🥉',
        Silver: '🥈',
        Gold: '🥇',
        Platinum: '💎'
    };

    document.getElementById('app').innerHTML = `
        <div class="w-full min-h-full" style="background: ${config.background_color || defaultConfig.background_color}; padding: ${baseFont * 2}px ${baseFont * 1.5}px;">
          <div style="max-width: 1400px; margin: 0 auto;">
            
            <!-- Header Section -->
            <header class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: ${baseFont * 2}px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: ${baseFont}px;">
                <div>
                  <h1 style="font-size: ${baseFont * 2}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 0.25}px;">
                    ${config.employee_name || defaultConfig.employee_name}
                  </h1>
                  <p style="font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.6;">
                    ${config.employee_id || defaultConfig.employee_id} • ${config.department || defaultConfig.department}
                  </p>
                </div>
                <div style="text-align: right;">
                  <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.6; margin-bottom: ${baseFont * 0.25}px;">
                    Last Updated
                  </p>
                  <p style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                    ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </header>

            <div style="display: grid; gap: ${baseFont * 1.5}px;">

              <!-- 1. Performance Score Section -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                  📊 Performance Score
                </h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: ${baseFont * 1.5}px;">
                  
                  <!-- Overall Score Card -->
                  <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%); padding: ${baseFont * 2}px; border-radius: ${baseFont * 0.75}px; color: white; text-align: center; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -20%; right: -20%; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    <p style="font-size: ${baseFont * 0.875}px; opacity: 0.9; margin-bottom: ${baseFont * 0.75}px; position: relative; z-index: 1;">
                      Overall Score
                    </p>
                    <div style="font-size: ${baseFont * 4}px; font-weight: 700; margin-bottom: ${baseFont * 0.75}px; position: relative; z-index: 1;">
                      ${performanceData.overallScore}%
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; gap: ${baseFont * 0.5}px; position: relative; z-index: 1;">
                      <span style="font-size: ${baseFont * 1.5}px;">${isImprovement ? '↑' : '↓'}</span>
                      <span style="font-size: ${baseFont * 1.125}px; font-weight: 600;">
                        ${Math.abs(performanceData.monthTrend)}% this month
                      </span>
                    </div>
                  </div>
                  
                  <!-- Growth Indicator Card -->
                  <div style="background: ${isImprovement ? '#ecfdf5' : '#fef2f2'}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; border: 3px solid ${isImprovement ? '#10b981' : '#ef4444'};">
                    <h3 style="font-size: ${baseFont * 1.125}px; font-weight: 600; color: ${textColor}; margin-bottom: ${baseFont}px;">
                      Growth Indicator
                    </h3>
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <div style="font-size: ${baseFont * 3}px; color: ${isImprovement ? '#10b981' : '#ef4444'};">
                        ${isImprovement ? '↑' : '↓'}
                      </div>
                      <div>
                        <p style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${isImprovement ? '#10b981' : '#ef4444'}; margin-bottom: ${baseFont * 0.25}px;">
                          ${isImprovement ? 'Improvement' : 'Decline'}
                        </p>
                        <p style="font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.7;">
                          vs Last Month
                        </p>
                      </div>
                    </div>
                    <div style="margin-top: ${baseFont * 1.5}px; padding: ${baseFont}px; background: ${isImprovement ? '#d1fae5' : '#fee2e2'}; border-radius: ${baseFont * 0.5}px; text-align: center;">
                      <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.25}px;">
                        Month-to-Month Trend
                      </p>
                      <p style="font-size: ${baseFont * 1.25}px; font-weight: 700; color: ${isImprovement ? '#059669' : '#dc2626'};">
                        ${isImprovement ? '+' : ''}${performanceData.monthTrend}%
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              <!-- 2. Task Completion Analysis -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                  ✓ Task Completion Analysis
                </h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: ${baseFont}px; margin-bottom: ${baseFont * 1.5}px;">
                  <div style="padding: ${baseFont * 1.25}px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${primaryColor};">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Assigned vs Completed
                    </p>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: ${textColor};">
                      ${performanceData.completedTasks} / ${performanceData.assignedTasks}
                    </p>
                  </div>
                  
                  <div style="padding: ${baseFont * 1.25}px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: ${baseFont * 0.5}px; border-left: 4px solid #10b981;">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Completion Rate
                    </p>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: #10b981;">
                      ${completionRate}%
                    </p>
                  </div>
                  
                  <div style="padding: ${baseFont * 1.25}px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: ${baseFont * 0.5}px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Delayed Submissions
                    </p>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: #f59e0b;">
                      ${performanceData.delayedSubmissions}
                    </p>
                  </div>
                  
                  <div style="padding: ${baseFont * 1.25}px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: ${baseFont * 0.5}px; border-left: 4px solid #10b981;">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Data Quality Score
                    </p>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: #10b981;">
                      ${performanceData.dataQuality}%
                    </p>
                  </div>
                </div>

                <!-- Completion Rate Progress Bar -->
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${baseFont * 0.75}px;">
                    <p style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                      Overall Task Completion
                    </p>
                    <p style="font-size: ${baseFont * 1.125}px; font-weight: 700; color: ${primaryColor};">
                      ${completionRate}%
                    </p>
                  </div>
                  <div style="width: 100%; height: ${baseFont * 1.5}px; background: #e2e8f0; border-radius: ${baseFont}px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);">
                    <div style="width: ${completionRate}%; height: 100%; background: linear-gradient(90deg, ${primaryColor}, ${primaryColor}dd); transition: width 1s ease-out; border-radius: ${baseFont}px;"></div>
                  </div>
                </div>
              </section>

              <!-- 3. Growth Metrics -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: ${baseFont}px; margin-bottom: ${baseFont * 1.5}px;">
                  <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor};">
                    📈 Growth Metrics
                  </h2>
                  ${isTopPerformer ? `
                    <div class="pulse" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: ${baseFont * 0.5}px ${baseFont * 1.25}px; border-radius: ${baseFont * 1.5}px; font-size: ${baseFont * 0.875}px; font-weight: 700; box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3);">
                      ⭐ TOP PERFORMER
                    </div>
                  ` : ''}
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: ${baseFont}px; margin-bottom: ${baseFont * 2}px;">
                  <div style="text-align: center; padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: ${baseFont * 0.75}px; border: 2px solid #10b981;">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Monthly Growth
                    </p>
                    <p style="font-size: ${baseFont * 2.5}px; font-weight: 700; color: #10b981;">
                      +${performanceData.monthlyGrowth}%
                    </p>
                  </div>
                  
                  <div style="text-align: center; padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%); border-radius: ${baseFont * 0.75}px; border: 2px solid ${primaryColor};">
                    <p style="font-size: ${baseFont * 0.75}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont * 0.5}px;">
                      Consistency Score
                    </p>
                    <p style="font-size: ${baseFont * 2.5}px; font-weight: 700; color: ${primaryColor};">
                      ${performanceData.consistencyScore}%
                    </p>
                  </div>
                </div>

                <!-- 3-Month Performance Graph -->
                <div style="background: #f8fafc; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px;">
                  <p style="font-size: ${baseFont * 1.125}px; font-weight: 600; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                    Last 3 Months Performance Trend
                  </p>
                  <div style="display: flex; align-items: flex-end; gap: ${baseFont}px; height: 180px; padding: ${baseFont}px;">
                    ${performanceData.threeMonthPerf.map((score, index) => `
                      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: ${baseFont * 0.75}px;">
                        <div style="font-size: ${baseFont}px; font-weight: 700; color: ${textColor};">
                          ${score}%
                        </div>
                        <div style="width: 100%; background: linear-gradient(to top, ${primaryColor}, ${primaryColor}aa); border-radius: ${baseFont * 0.5}px ${baseFont * 0.5}px 0 0; height: ${score}%; min-height: 40px; position: relative; box-shadow: 0 -2px 8px rgba(59, 130, 246, 0.3); transition: height 1s ease-out;">
                          <div style="position: absolute; top: -${baseFont * 1.5}px; left: 50%; transform: translateX(-50%); width: ${baseFont * 0.75}px; height: ${baseFont * 0.75}px; background: ${primaryColor}; border-radius: 50%; box-shadow: 0 0 0 ${baseFont * 0.25}px white, 0 0 0 ${baseFont * 0.375}px ${primaryColor};"></div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                  <div style="display: flex; justify-content: space-around; font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.6; margin-top: ${baseFont}px; font-weight: 600;">
                    <span>2 Months Ago</span>
                    <span>Last Month</span>
                    <span>This Month</span>
                  </div>
                </div>
              </section>

              <!-- 4. Risk Indicators -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 2px solid ${performanceData.rejectedSubmissions > 0 || performanceData.missedVisits > 0 ? '#f59e0b' : '#e2e8f0'};">
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                  ⚠️ Downfall / Risk Indicators
                </h2>
                
                <div style="display: grid; gap: ${baseFont}px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: ${baseFont * 1.25}px; background: ${performanceData.rejectedSubmissions > 0 ? '#fee2e2' : '#f0fdf4'}; border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${performanceData.rejectedSubmissions > 0 ? '#ef4444' : '#10b981'};">
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <span style="font-size: ${baseFont * 1.5}px;">❌</span>
                      <span style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                        Rejected Submissions
                      </span>
                    </div>
                    <span style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${performanceData.rejectedSubmissions > 0 ? '#ef4444' : '#10b981'};">
                      ${performanceData.rejectedSubmissions}
                    </span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: ${baseFont * 1.25}px; background: ${performanceData.dataQualityIssues > 0 ? '#fef3c7' : '#f0fdf4'}; border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${performanceData.dataQualityIssues > 0 ? '#f59e0b' : '#10b981'};">
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <span style="font-size: ${baseFont * 1.5}px;">⚡</span>
                      <span style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                        Data Quality Issues
                      </span>
                    </div>
                    <span style="font-size: ${baseFont * 1.125}px; font-weight: 700; color: ${performanceData.dataQualityIssues > 0 ? '#f59e0b' : '#10b981'};">
                      ${performanceData.dataQualityIssues > 0 ? performanceData.dataQualityIssues + ' Issues' : 'Good'}
                    </span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: ${baseFont * 1.25}px; background: ${performanceData.missedVisits > 0 ? '#fee2e2' : '#f0fdf4'}; border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${performanceData.missedVisits > 0 ? '#ef4444' : '#10b981'};">
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <span style="font-size: ${baseFont * 1.5}px;">📍</span>
                      <span style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                        Missed Field Visits
                      </span>
                    </div>
                    <span style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${performanceData.missedVisits > 0 ? '#ef4444' : '#10b981'};">
                      ${performanceData.missedVisits}
                    </span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: ${baseFont * 1.25}px; background: ${performanceData.consistencyScore < 80 ? '#fef3c7' : '#f0fdf4'}; border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${performanceData.consistencyScore < 80 ? '#f59e0b' : '#10b981'};">
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <span style="font-size: ${baseFont * 1.5}px;">📊</span>
                      <span style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                        Consistency Alert
                      </span>
                    </div>
                    <span style="font-size: ${baseFont * 1.125}px; font-weight: 700; color: ${performanceData.consistencyScore < 80 ? '#f59e0b' : '#10b981'};">
                      ${performanceData.consistencyScore < 80 ? 'Monitor' : 'Excellent'}
                    </span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: ${baseFont * 1.25}px; background: ${performanceData.completedTasks < 20 ? '#fee2e2' : '#f0fdf4'}; border-radius: ${baseFont * 0.5}px; border-left: 4px solid ${performanceData.completedTasks < 20 ? '#ef4444' : '#10b981'};">
                    <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                      <span style="font-size: ${baseFont * 1.5}px;">🔔</span>
                      <span style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                        Low Activity Warning
                      </span>
                    </div>
                    <span style="font-size: ${baseFont * 1.125}px; font-weight: 700; color: ${performanceData.completedTasks < 20 ? '#ef4444' : '#10b981'};">
                      ${performanceData.completedTasks < 20 ? 'Active' : 'Normal'}
                    </span>
                  </div>
                </div>
              </section>

              <!-- 5. Achievement & Promotion Tracker -->
              <section class="fade-in" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: ${baseFont * 2}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 4px 6px rgba(251, 191, 36, 0.3); color: white; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; margin-bottom: ${baseFont * 1.5}px; position: relative; z-index: 1;">
                  🏆 Achievement & Promotion Tracker
                </h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: ${baseFont * 1.5}px; position: relative; z-index: 1;">
                  
                  <!-- Current Rank -->
                  <div style="text-align: center; padding: ${baseFont * 2}px; background: rgba(255,255,255,0.2); border-radius: ${baseFont * 0.75}px; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                    <p style="font-size: ${baseFont * 0.875}px; opacity: 0.9; margin-bottom: ${baseFont}px; font-weight: 600;">
                      Current Rank
                    </p>
                    <div style="font-size: ${baseFont * 4}px; margin-bottom: ${baseFont * 0.75}px;">
                      ${rankEmoji[performanceData.currentRank]}
                    </div>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700;">
                      ${performanceData.currentRank}
                    </p>
                  </div>
                  
                  <!-- Promotion Eligibility -->
                  <div style="padding: ${baseFont * 1.5}px; background: rgba(255,255,255,0.2); border-radius: ${baseFont * 0.75}px; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3);">
                    <p style="font-size: ${baseFont * 0.875}px; opacity: 0.9; margin-bottom: ${baseFont}px; font-weight: 600;">
                      Promotion Eligibility
                    </p>
                    <div style="margin-bottom: ${baseFont}px;">
                      <div style="width: 100%; height: ${baseFont * 1.25}px; background: rgba(255,255,255,0.3); border-radius: ${baseFont}px; overflow: hidden;">
                        <div style="width: ${performanceData.promotionEligibility}%; height: 100%; background: white; transition: width 1s ease-out; border-radius: ${baseFont}px; box-shadow: 0 0 10px rgba(255,255,255,0.5);"></div>
                      </div>
                    </div>
                    <p style="font-size: ${baseFont * 2}px; font-weight: 700;">
                      ${performanceData.promotionEligibility}%
                    </p>
                    <p style="font-size: ${baseFont * 0.75}px; opacity: 0.8; margin-top: ${baseFont * 0.5}px;">
                      ${100 - performanceData.promotionEligibility}% more to promote
                    </p>
                  </div>
                  
                </div>

                <!-- Points to Next Level -->
                <div style="margin-top: ${baseFont * 1.5}px; padding: ${baseFont * 1.5}px; background: rgba(255,255,255,0.2); border-radius: ${baseFont * 0.75}px; backdrop-filter: blur(10px); text-align: center; border: 2px solid rgba(255,255,255,0.3); position: relative; z-index: 1;">
                  <p style="font-size: ${baseFont}px; opacity: 0.9; margin-bottom: ${baseFont * 0.5}px; font-weight: 600;">
                    Required Points to Next Level
                  </p>
                  <p style="font-size: ${baseFont * 2.5}px; font-weight: 700; margin-bottom: ${baseFont * 0.5}px;">
                    ${performanceData.pointsToNext} pts
                  </p>
                  <p style="font-size: ${baseFont * 0.875}px; opacity: 0.85;">
                    Next Rank: Platinum 💎
                  </p>
                </div>
              </section>

              <!-- 6. Rewards & Recognition -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                  🎁 Rewards & Recognition
                </h2>
                
                <!-- Points and Bonuses -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: ${baseFont * 1.5}px; margin-bottom: ${baseFont * 1.5}px;">
                  <div style="padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: ${baseFont * 0.75}px; color: white; text-align: center; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                    <p style="font-size: ${baseFont * 0.75}px; opacity: 0.9; margin-bottom: ${baseFont * 0.75}px; font-weight: 600;">
                      Reward Points Earned
                    </p>
                    <p style="font-size: ${baseFont * 3}px; font-weight: 700;">
                      ${performanceData.rewardPoints}
                    </p>
                  </div>
                  
                  <div style="padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: ${baseFont * 0.75}px; color: white; text-align: center; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                    <p style="font-size: ${baseFont * 0.75}px; opacity: 0.9; margin-bottom: ${baseFont * 0.75}px; font-weight: 600;">
                      Monthly Bonuses
                    </p>
                    <p style="font-size: ${baseFont * 3}px; font-weight: 700;">
                      $${performanceData.monthlyBonus}
                    </p>
                  </div>
                </div>

                <!-- Certificates & Recognition -->
                <div style="background: #f8fafc; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; margin-bottom: ${baseFont * 1.5}px;">
                  <h3 style="font-size: ${baseFont * 1.125}px; font-weight: 600; color: ${textColor}; margin-bottom: ${baseFont}px;">
                    🏅 Certificates Unlocked
                  </h3>
                  <div style="display: grid; gap: ${baseFont * 0.75}px;">
                    ${performanceData.certificates.map(cert => `
                      <div style="padding: ${baseFont}px; background: white; border-radius: ${baseFont * 0.5}px; border: 2px solid #e2e8f0; display: flex; align-items: center; gap: ${baseFont}px;">
                        <div style="font-size: ${baseFont * 2}px;">🏅</div>
                        <div>
                          <p style="font-size: ${baseFont}px; font-weight: 600; color: ${textColor};">
                            ${cert}
                          </p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Appreciation Notes -->
                <div style="padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: ${baseFont * 0.75}px; border: 2px solid #f59e0b;">
                  <div style="display: flex; align-items: center; gap: ${baseFont}px;">
                    <div style="font-size: ${baseFont * 2.5}px;">💌</div>
                    <div>
                      <p style="font-size: ${baseFont * 1.125}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 0.25}px;">
                        ${performanceData.appreciationNotes} Appreciation Notes
                      </p>
                      <p style="font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.8;">
                        "Outstanding dedication to quality and excellence"
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 7. Weekly Summary -->
              <section class="fade-in" style="background: ${surfaceColor}; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <h2 style="font-size: ${baseFont * 1.5}px; font-weight: 700; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                  📅 Weekly Summary
                </h2>
                
                <!-- Best & Weakest Day -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: ${baseFont * 1.5}px; margin-bottom: ${baseFont * 2}px;">
                  <div style="padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 3px solid #10b981; border-radius: ${baseFont * 0.75}px; text-align: center;">
                    <p style="font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont}px; font-weight: 600;">
                      Best Day Performance
                    </p>
                    <div style="font-size: ${baseFont * 2}px; margin-bottom: ${baseFont * 0.5}px;">🌟</div>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: #10b981; margin-bottom: ${baseFont * 0.25}px;">
                      ${bestDay.day}
                    </p>
                    <p style="font-size: ${baseFont * 1.25}px; font-weight: 600; color: ${textColor}; opacity: 0.7;">
                      ${bestDay.score}% Performance
                    </p>
                  </div>
                  
                  <div style="padding: ${baseFont * 1.5}px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 3px solid #f59e0b; border-radius: ${baseFont * 0.75}px; text-align: center;">
                    <p style="font-size: ${baseFont * 0.875}px; color: ${textColor}; opacity: 0.7; margin-bottom: ${baseFont}px; font-weight: 600;">
                      Weakest Day Indicator
                    </p>
                    <div style="font-size: ${baseFont * 2}px; margin-bottom: ${baseFont * 0.5}px;">📉</div>
                    <p style="font-size: ${baseFont * 1.75}px; font-weight: 700; color: #f59e0b; margin-bottom: ${baseFont * 0.25}px;">
                      ${weakestDay.day}
                    </p>
                    <p style="font-size: ${baseFont * 1.25}px; font-weight: 600; color: ${textColor}; opacity: 0.7;">
                      ${weakestDay.score}% Performance
                    </p>
                  </div>
                </div>

                <!-- Daily Performance Chart -->
                <div style="background: #f8fafc; padding: ${baseFont * 1.5}px; border-radius: ${baseFont * 0.75}px;">
                  <p style="font-size: ${baseFont * 1.125}px; font-weight: 600; color: ${textColor}; margin-bottom: ${baseFont * 1.5}px;">
                    Daily Performance Breakdown
                  </p>
                  <div style="display: flex; align-items: flex-end; gap: ${baseFont * 0.75}px; height: 200px; padding: ${baseFont}px;">
                    ${performanceData.weeklyPerformance.map((day) => {
        const barColor = day.score >= 90 ? '#10b981' : day.score >= 75 ? primaryColor : '#f59e0b';
        return `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: ${baseFont * 0.5}px;">
                          <div style="font-size: ${baseFont * 0.75}px; font-weight: 700; color: ${textColor};">
                            ${day.score}%
                          </div>
                          <div style="width: 100%; background: ${barColor}; border-radius: ${baseFont * 0.375}px ${baseFont * 0.375}px 0 0; height: ${day.score}%; min-height: 30px; box-shadow: 0 -2px 8px ${barColor}33; transition: height 1s ease-out; position: relative;">
                            ${day.score >= 90 ? `<div style="position: absolute; top: -${baseFont * 1.25}px; left: 50%; transform: translateX(-50%); font-size: ${baseFont * 0.875}px;">⭐</div>` : ''}
                          </div>
                          <div style="font-size: ${baseFont * 0.75}px; color: ${textColor}; font-weight: 600; text-align: center; margin-top: ${baseFont * 0.5}px;">
                            ${day.day.substring(0, 3)}
                          </div>
                        </div>
                      `;
    }).join('')}
                  </div>
                  
                  <!-- Legend -->
                  <div style="display: flex; justify-content: center; gap: ${baseFont * 2}px; margin-top: ${baseFont * 1.5}px; padding-top: ${baseFont}px; border-top: 2px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: ${baseFont * 0.5}px;">
                      <div style="width: ${baseFont}px; height: ${baseFont}px; background: #10b981; border-radius: ${baseFont * 0.25}px;"></div>
                      <span style="font-size: ${baseFont * 0.75}px; color: ${textColor};">Excellent (90%+)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: ${baseFont * 0.5}px;">
                      <div style="width: ${baseFont}px; height: ${baseFont}px; background: ${primaryColor}; border-radius: ${baseFont * 0.25}px;"></div>
                      <span style="font-size: ${baseFont * 0.75}px; color: ${textColor};">Good (75-89%)</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: ${baseFont * 0.5}px;">
                      <div style="width: ${baseFont}px; height: ${baseFont}px; background: #f59e0b; border-radius: ${baseFont * 0.25}px;"></div>
                      <span style="font-size: ${baseFont * 0.75}px; color: ${textColor};">Needs Focus (<75%)</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      `;
}

