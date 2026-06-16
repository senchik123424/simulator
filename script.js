const state = {
  initialized: false,
  month: 0,
  phase: "launch",
  capital: 0,
  users: 0,
  payingUsers: 0,
  employees: 0,
  salary: 0,
  fixedCosts: 0,
  marketingBudget: 0,
  price: 0,
  baseCAC: 0,
  baseRetention: 0,
  baseConversion: 0,
  investorShare: 0,
  investmentAlreadyRaised: false,
  history: [],
  lastMetrics: null
};

const hints = {
  capital: {
    title: "Начальный капитал",
    text: "Деньги, с которыми стартап начинает симуляцию. Из них оплачиваются команда, маркетинг, продукт и постоянные расходы.",
    range: "Для ИТ-стартапа капитал может быть 1 000 000-5 000 000 ₽."
  },
  employees: {
    title: "Количество сотрудников",
    text: "Размер команды на старте. Команда увеличивает расходы на зарплаты, но также помогает быстрее развивать продукт.",
    range: "Для ИТ-стартапа обычно 2-8 человек."
  },
  salary: {
    title: "Средняя зарплата сотрудника",
    text: "Средняя ежемесячная зарплата одного сотрудника. Используется для расчёта фонда оплаты труда команды.",
    range: "Для ИТ-стартапа средняя зарплата сотрудника может быть 60 000-150 000 ₽."
  },
  fixedCosts: {
    title: "Фиксированные расходы",
    text: "Ежемесячные расходы проекта без зарплат: аренда, хостинг, сервисы, связь, бухгалтерия и другие платежи.",
    range: "Для ИТ-стартапа можно взять 50 000-500 000 ₽."
  },
  marketing: {
    title: "Маркетинговый бюджет",
    text: "Ежемесячные расходы на привлечение пользователей: реклама, продвижение, контент, таргетинг и другие каналы привлечения аудитории.",
    range: "Для ИТ-стартапа можно взять 100 000-1 000 000 ₽."
  },
  price: {
    title: "Цена продукта",
    text: "Средний платёж одного платящего пользователя за месяц.",
    range: "Например: 500-1500 ₽ для массового продукта, 2000-5000 ₽ для B2B-сервиса."
  },
  users: {
  title: "Стартовые пользователи",
  text: "Количество пользователей на старте симуляции. После запуска этот показатель не нужно менять вручную: дальше аудитория будет изменяться автоматически в зависимости от маркетинга, продукта, цены и других управленческих решений.",
  range: "Рекомендуемый диапазон для старта: 50–200 пользователей."
  },
  cac: {
  title: "Базовый CAC",
  text: "Начальная стоимость привлечения одного нового пользователя до влияния управленческих решений. Этот показатель не нужно менять вручную в обычном режиме: фактический CAC будет автоматически изменяться под влиянием маркетинга, инвестиций в продукт и размера команды.",
  range: "Чем ниже CAC, тем дешевле привлекать пользователей. Параметр лучше использовать только для настройки модели."
  },
  retention: {
  title: "Базовое удержание",
  text: "Начальная доля пользователей, которые остаются в продукте на следующий месяц. Этот показатель не нужно менять вручную в процессе симуляции: удержание будет автоматически меняться под влиянием инвестиций в продукт, команды и оптимизации расходов.",
  range: "В симуляторе удержание улучшается через развитие продукта и достаточную команду."
  },
  conversion: {
  title: "Базовая конверсия",
  text: "Начальная доля пользователей, которые становятся платящими. Этот показатель не нужно менять вручную в процессе симуляции: конверсия будет автоматически изменяться в зависимости от качества продукта, цены и управленческих решений.",
  range: "В симуляторе конверсия зависит от развития продукта, команды и изменения цены."
  },
  investment: {
    title: "Привлечение инвестиций",
    text: "Инвестор даёт 500 000 ₽ один раз, но получает 20% будущей положительной прибыли.",
    range: "Это не кредит: деньги возвращать не надо, но часть будущей прибыли уходит инвестору."
  },
  metricPhase: { title: "Фаза", text: "Показывает текущий этап стартапа. До 500 пользователей проект находится на этапе запуска, после 500 пользователей переходит к этапу роста.", range: "На запуске важно набрать аудиторию, а на этапе роста – следить за расходами, прибылью и эффективностью привлечения." },
  metricCapital: { title: "Капитал", text: "Оставшиеся деньги с учётом выручки, расходов и возможных инвестиций.", range: "Если капитал стал меньше или равен нулю, симуляция останавливается." },
  metricUsers: { title: "Пользователи", text: "Все активные пользователи продукта в текущем месяце.", range: "Пользователи растут за счёт маркетинга, органического роста и удержания старой аудитории." },
  metricPayingUsers: { title: "Платящие пользователи", text: "Пользователи, которые оплачивают продукт в текущем месяце.", range: "Зависят от общей аудитории, конверсии и изменения цены." },
  metricRevenue: { title: "Выручка", text: "Доход за месяц: платящие пользователи * цена продукта.", range: "Выручка растёт, если увеличивается число платящих пользователей или цена продукта." },
  metricExpenses: { title: "Расходы", text: "Все расходы за месяц: зарплаты команды, фиксированные расходы, маркетинг и продукт", range: "Если расходы растут быстрее выручки, стартап может быстро потерять капитал." },
  metricProfit: { title: "Финансовый результат", text: "Разница между выручкой и расходами. Если есть инвестор, его доля вычитается из положительной прибыли.", range: "Плюс – проект зарабатывает, минус – тратит больше, чем получает." },
  metricRunway: { title: "Запас времени", text: "На сколько месяцев хватит текущего капитала при текущем уровне убытков.", range: "Если запас времени меньше 6 месяцев, нужно осторожнее увеличивать расходы и искать способы повысить выручку." },
  metricCac: { title: "CAC", text: "Показывает, сколько в среднем стоит привлечение одного нового пользователя.", range: "На этот показатель влияют маркетинг, развитие продукта и команда. Чем ниже стоимость привлечения, тем выгоднее рост аудитории." },
  metricLtv: { title: "LTV", text: "Показывает, сколько денег в среднем может принести один пользователь за время использования продукта. Упрощённая формула: LTV = средний платёж за месяц * среднее число месяцев удержания.", range: "Чем выше удержание и цена продукта, тем выше ценность пользователя для стартапа." },
  metricRatio: { title: "LTV / CAC", text: "Показывает соотношение между ценностью пользователя и стоимостью его привлечения.", range: "Если значение меньше 1, привлечение не окупается. Если около 3 и выше, привлечение пользователей считается эффективным." },
  metricInvestor: { title: "Доля инвестора", text: "Показывает, какая часть будущей положительной прибыли отдаётся инвестору после привлечения инвестиций.", range: "Инвестиции увеличивают капитал, но уменьшают часть прибыли, которая остаётся у стартапа." }
};

const els = {
  startupName: document.getElementById("startupName"),
  capital: document.getElementById("capital"),
  employees: document.getElementById("employees"),
  salary: document.getElementById("salary"),
  fixedCosts: document.getElementById("fixedCosts"),
  marketing: document.getElementById("marketing"),
  price: document.getElementById("price"),
  users: document.getElementById("users"),
  cac: document.getElementById("cac"),
  retention: document.getElementById("retention"),
  conversion: document.getElementById("conversion"),
  marketingBudget: document.getElementById("marketingBudget"),
  hireCount: document.getElementById("hireCount"),
  productInvestment: document.getElementById("productInvestment"),
  priceChange: document.getElementById("priceChange"),
  costOptimization: document.getElementById("costOptimization"),
  raiseInvestment: document.getElementById("raiseInvestment"),
  marketingBudgetValue: document.getElementById("marketingBudgetValue"),
  hireCountValue: document.getElementById("hireCountValue"),
  productInvestmentValue: document.getElementById("productInvestmentValue"),
  priceChangeValue: document.getElementById("priceChangeValue"),
  costOptimizationValue: document.getElementById("costOptimizationValue"),
  startBtn: document.getElementById("startBtn"),
  resetBtn: document.getElementById("resetBtn"),
  nextBtn: document.getElementById("nextBtn"),
  mPhase: document.getElementById("mPhase"),
  mCapital: document.getElementById("mCapital"),
  mUsers: document.getElementById("mUsers"),
  mPayingUsers: document.getElementById("mPayingUsers"),
  mRevenue: document.getElementById("mRevenue"),
  mExpenses: document.getElementById("mExpenses"),
  mProfit: document.getElementById("mProfit"),
  mRunway: document.getElementById("mRunway"),
  mCac: document.getElementById("mCac"),
  mLtv: document.getElementById("mLtv"),
  mRatio: document.getElementById("mRatio"),
  mInvestorShare: document.getElementById("mInvestorShare"),
  monthSummary: document.getElementById("monthSummary"),
  recommendations: document.getElementById("recommendations"),
  log: document.getElementById("log"),
  chart: document.getElementById("chart"),
  hintModal: document.getElementById("hintModal"),
  closeHintModal: document.getElementById("closeHintModal"),
  hintTitle: document.getElementById("hintTitle"),
  hintText: document.getElementById("hintText"),
  hintRange: document.getElementById("hintRange")
};

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function formatNumber(value) {
  return Math.round(value).toLocaleString("ru-RU");
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1).replace(".0", "")} %`;
}

function getPhase(users) {
  return users >= 500 ? "growth" : "launch";
}

function getPhaseLabel(phase) {
  return phase === "growth" ? "Рост" : "Запуск";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function percentChange(current, previous) {
  if (!previous || previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

function signedPercent(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1).replace(".0", "")}%`;
}

function updateDecisionLabels() {
  els.marketingBudgetValue.textContent = formatMoney(Number(els.marketingBudget.value));
  els.hireCountValue.textContent = String(Number(els.hireCount.value));
  els.productInvestmentValue.textContent = formatMoney(Number(els.productInvestment.value));
  els.priceChangeValue.textContent = `${Number(els.priceChange.value)}%`;
  els.costOptimizationValue.textContent = `${Number(els.costOptimization.value)}%`;
}

function resetDecisionControls() {
  const initialMarketingBudget = Number(state.marketingBudget || els.marketing?.value || 0);
  if (els.marketingBudget) {
    els.marketingBudget.max = Math.max(Number(els.marketingBudget.max || 700000), initialMarketingBudget * 2, 700000);
    els.marketingBudget.value = initialMarketingBudget;
  }
  els.hireCount.value = 0;
  els.productInvestment.value = 0;
  els.priceChange.value = 0;
  els.costOptimization.value = 0;
  if (state.investmentAlreadyRaised) {
    els.raiseInvestment.value = 0;
    els.raiseInvestment.disabled = true;
  } else {
    els.raiseInvestment.value = 0;
    els.raiseInvestment.disabled = false;
  }
  updateDecisionLabels();
}

function readInputs() {
  state.initialized = true;
  state.month = 0;
  state.capital = Number(els.capital.value || 0);
  state.users = Number(els.users.value || 0);
  state.employees = Number(els.employees.value || 0);
  state.salary = Number(els.salary.value || 0);
  state.fixedCosts = Number(els.fixedCosts.value || 0);
  state.marketingBudget = Number(els.marketing.value || 0);
  state.price = Number(els.price.value || 0);
  state.baseCAC = Number(els.cac.value || 2200);
  state.baseRetention = Number(els.retention.value || 70) / 100;
  state.baseConversion = Number(els.conversion.value || 12) / 100;
  state.phase = getPhase(state.users);
  state.payingUsers = Math.round(state.users * state.baseConversion);
  state.investorShare = 0;
  state.investmentAlreadyRaised = false;
  state.history = [];
  state.lastMetrics = null;
}

function validateInputs() {
  const required = [els.capital, els.employees, els.salary, els.fixedCosts, els.marketing, els.price, els.users, els.cac, els.retention, els.conversion];
  return required.every((input) => input && Number(input.value) >= 0) && Number(els.cac.value) > 0 && Number(els.price.value) > 0;
}

function calculateMonth() {
  const previous = state.lastMetrics || {
    users: state.users,
    payingUsers: state.payingUsers,
    revenue: state.payingUsers * state.price,
    retention: state.baseRetention,
    conversion: state.baseConversion,
    cac: state.baseCAC,
    price: state.price,
    capital: state.capital
  };

  const marketingBudget = Number(els.marketingBudget.value || 0);
  const hireCount = Number(els.hireCount.value || 0);
  const productInvestment = Number(els.productInvestment.value || 0);
  const priceChange = Number(els.priceChange.value || 0) / 100;
  const costOptimization = Number(els.costOptimization.value || 0) / 100;
  const requestedInvestment = Number(els.raiseInvestment.value || 0);
  const phaseAtStart = getPhase(state.users);

  const investmentRaised = !state.investmentAlreadyRaised && requestedInvestment > 0 ? 500000 : 0;
  if (investmentRaised > 0) {
    state.investmentAlreadyRaised = true;
    state.investorShare = clamp(state.investorShare + 0.2, 0, 0.8);
    els.raiseInvestment.disabled = true;
  }

  state.employees += hireCount;

  let strategyPenalty = 0;

  if (marketingBudget > 300000) {
    strategyPenalty += 0.15;
  }

  if (priceChange > 0.15) {
    strategyPenalty += 0.20;
  }

  if (hireCount >= 2) {
    strategyPenalty += 0.15;
  }

  if (marketingBudget > 150000 && productInvestment < 30000) {
    strategyPenalty += 0.10;
  }

const goodStrategy =
  marketingBudget >= 50000 &&
  marketingBudget <= 200000 &&
  productInvestment >= 30000 &&
  hireCount <= 1 &&
  priceChange <= 0.1;

  const productBoost = Math.min(productInvestment / 350000, 0.20);
  const teamBoost = Math.min(state.employees * 0.004 + hireCount * 0.006, 0.06);
  const priceDemandPenalty = priceChange > 0 ? Math.min(priceChange * 0.22, 0.16) : priceChange * 0.12;
  const optimizationPenalty = Math.min(costOptimization * 0.04, 0.015);

  const goodBonus = goodStrategy ? 0.03 : 0;

  const effectiveRetention = clamp(
    state.baseRetention + productBoost + teamBoost - optimizationPenalty - strategyPenalty * 0.5 + goodBonus,
    0.30,
    0.95
  );

  const effectiveConversion = clamp(
    state.baseConversion + productBoost * 0.55 + teamBoost * 0.25 - priceDemandPenalty - strategyPenalty * 0.5 + goodBonus,
    0.01,
    0.35
  );  
  const effectivePrice = Math.max(1, state.price * (1 + priceChange));

  const marketingPressure = marketingBudget > 250000 ? 1 + (marketingBudget - 250000) / 250000 * 0.25 : 1;
  const productCACImprovement = Math.min(productInvestment / 1800000, 0.22);
  const teamCACImprovement = Math.min(state.employees * 0.008, 0.12);
  const effectiveCAC = Math.max( 150, state.baseCAC * marketingPressure * (1 + strategyPenalty) * (1 - productCACImprovement) * (1 - teamCACImprovement)
  );

  const paidAcquisition = Math.round(marketingBudget / effectiveCAC);
  const organicGrowthRate = phaseAtStart === "growth" ? 0.25 : 0.14;
  const organicUsers = Math.round(state.users * (organicGrowthRate + productBoost * 0.55 + teamBoost * 0.25));
  const retainedUsers = Math.round(state.users * effectiveRetention);

  const priceUserPenalty = priceChange > 0.15
    ? Math.min((priceChange - 0.15) * 1.2, 0.35)
    : 0;

  const usersBeforePricePenalty = retainedUsers + paidAcquisition + organicUsers;
  const users = Math.max(0, Math.round(usersBeforePricePenalty * (1 - priceUserPenalty)));

  const retainedPayingUsers = Math.round(state.payingUsers * clamp(effectiveRetention + 0.04, 0.35, 0.98));
  const newPayingUsers = Math.round(Math.max(0, users - retainedPayingUsers) * effectiveConversion);
  const payingUsers = Math.min(users, retainedPayingUsers + newPayingUsers);

  const grossRevenue = payingUsers * effectivePrice;
  const payroll = state.employees * state.salary;
  const optimizedFixedCosts = state.fixedCosts * (1 - costOptimization);
  const expenses = payroll + optimizedFixedCosts + marketingBudget + productInvestment;
  const profitBeforeInvestor = grossRevenue - expenses;
  const investorPayout = profitBeforeInvestor > 0 ? profitBeforeInvestor * state.investorShare : 0;
  const profit = profitBeforeInvestor - investorPayout;
  const monthlyLoss = profit < 0 ? Math.abs(profit) : 0;

  state.capital = state.capital + profit + investmentRaised;
  state.users = users;
  state.payingUsers = payingUsers;
  state.phase = getPhase(users);
  state.month += 1;

  const averageRetentionMonths = 1 / Math.max(0.1, 1 - effectiveRetention);
  const ltv = effectivePrice * averageRetentionMonths;
  const ratio = effectiveCAC > 0 ? ltv / effectiveCAC : 0;
  const runway = monthlyLoss > 0 ? state.capital / monthlyLoss : Infinity;

  const metrics = {
    month: state.month,
    phase: state.phase,
    phaseAtStart,
    capital: state.capital,
    users,
    payingUsers,
    revenue: grossRevenue,
    expenses,
    payroll,
    optimizedFixedCosts,
    profit,
    profitBeforeInvestor,
    monthlyLoss,
    runway,
    cac: effectiveCAC,
    ltv,
    ratio,
    retention: effectiveRetention,
    conversion: effectiveConversion,
    price: effectivePrice,
    employees: state.employees,
    retainedUsers,
    acquiredUsers: paidAcquisition + organicUsers,
    paidAcquisition,
    organicUsers,
    marketingBudget,
    hireCount,
    productInvestment,
    priceChange,
    costOptimization,
    investmentRaised,
    investorShare: state.investorShare,
    investorPayout,
    previous,
    summary: []
  };

  metrics.summary = buildMonthSummary(metrics, previous);
  state.lastMetrics = metrics;
  state.history.push(metrics);
  return metrics;
}

function buildMonthSummary(metrics, previous) {
  const items = [];
  const userDelta = percentChange(metrics.users, previous.users);
  const payingDelta = percentChange(metrics.payingUsers, previous.payingUsers);
  const revenueDelta = percentChange(metrics.revenue, previous.revenue);

  if (metrics.marketingBudget === 0) {
    items.push("Маркетинг отключён: новых платных пользователей почти нет, рост зависит в основном от органики.");
  } else if (metrics.marketingBudget >= 300000) {
    items.push(`Вы активно вложились в маркетинг: привлечено ${formatNumber(metrics.paidAcquisition)} пользователей, общая аудитория изменилась на ${signedPercent(userDelta)}.`);
  } else {
    items.push(`Маркетинг дал ${formatNumber(metrics.paidAcquisition)} новых пользователей; аудитория изменилась на ${signedPercent(userDelta)}.`);
  }

  if (metrics.productInvestment > 0) {
    items.push(`Инвестиции в продукт улучшили удержание до ${formatPercent(metrics.retention)} и конверсию до ${formatPercent(metrics.conversion)}.`);
  }

  if (metrics.hireCount > 0) {
    items.push(`Вы наняли ${metrics.hireCount} сотрудн.: команда ускорила развитие продукта, а фонд зарплат вырос до ${formatMoney(metrics.payroll)} в месяц.`);
  } else if (metrics.employees > 7 && metrics.productInvestment < 50000) {
    items.push("Команда уже большая, но вложений в продукт мало: часть сотрудников может быть недозагружена.");
  }

  if (metrics.priceChange !== 0) {
    const direction = metrics.priceChange > 0 ? "повысили" : "снизили";
    items.push(`Вы ${direction} цену на ${Math.abs(metrics.priceChange * 100)}%: платящие пользователи изменились на ${signedPercent(payingDelta)}, выручка – на ${signedPercent(revenueDelta)}.`);
  } else {
    items.push(`Цена не менялась: выручка изменилась на ${signedPercent(revenueDelta)} за счёт аудитории и конверсии.`);
  }
  
  if (metrics.priceChange > 0.15 && metrics.users < previous.users) {
  items.push("Цена выросла больше чем на 15%: часть пользователей отказалась от продукта, поэтому общая аудитория уменьшилась.");
  }

  if (metrics.costOptimization > 0) {
    items.push(`Оптимизация снизила постоянные расходы на ${Math.round(metrics.costOptimization * 100)}%, но слишком сильная экономия немного ухудшает качество продукта.`);
  }

  if (metrics.investmentRaised > 0) {
    items.push("Привлечены инвестиции: капитал вырос на 500 000 ₽, но инвестор теперь получает 20% будущей положительной прибыли.");
  }

  if (metrics.phaseAtStart === "launch" && metrics.phase === "growth") {
    items.push("Стартап автоматически перешёл в фазу «Рост»: аудитория превысила 500 пользователей, теперь важнее следить за LTV/CAC и прибыльностью.");
  }

  return items;
}

function renderMetrics(metrics) {
  els.mPhase.textContent = getPhaseLabel(metrics.phase);
  els.mCapital.textContent = formatMoney(metrics.capital);
  els.mUsers.textContent = formatNumber(metrics.users);
  els.mPayingUsers.textContent = formatNumber(metrics.payingUsers);
  els.mRevenue.textContent = formatMoney(metrics.revenue);
  els.mExpenses.textContent = formatMoney(metrics.expenses);
  els.mProfit.textContent = `${metrics.profit >= 0 ? "+" : ""}${formatMoney(metrics.profit)}`;
  els.mProfit.className = metrics.profit >= 0 ? "positive" : "negative";
  els.mRunway.textContent = Number.isFinite(metrics.runway) ? `${metrics.runway.toFixed(1)} мес.` : "∞";
  els.mCac.textContent = formatMoney(metrics.cac);
  els.mLtv.textContent = formatMoney(metrics.ltv);
  els.mRatio.textContent = metrics.ratio.toFixed(2);
  els.mInvestorShare.textContent = `${Math.round(metrics.investorShare * 100)}%`;
}

function renderMonthSummary(metrics) {
  els.monthSummary.innerHTML = `<ul>${metrics.summary.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderRecommendations(metrics) {
  const items = [];

if (metrics.capital <= 0) {
  items.push("Капитал закончился. В следующем запуске сократите маркетинг, найм и продуктовые вложения минимум на 30%.");
}

// Ранний этап: 1–3 месяц
if (metrics.month <= 3) {
  if (metrics.profit < 0 && metrics.capital > 0) {
    items.push("На старте убыток допустим. Продолжайте развивать продукт и не увеличивайте найм.");
  }

  if (metrics.productInvestment === 0) {
    items.push("Добавьте первые вложения в продукт: 30 000-50 000 ₽ в месяц.");
  }

  if (metrics.marketingBudget < 50000 && metrics.users < 300) {
    items.push("Аудитория растёт медленно. Увеличьте маркетинг на 10-15%.");
  }

  if (metrics.hireCount > 0) {
    items.push("На первых месяцах лучше не расширять команду. Сначала проверьте спрос и продукт.");
  }

  if (metrics.priceChange > 0.1) {
    items.push("Не повышайте цену резко на старте. Ограничьте рост цены до 5-10%.");
  }
}

// Основной этап: с 4 месяца
if (metrics.month > 3) {
  if (metrics.runway < 6) {
    items.push("Запас времени меньше 6 месяцев. Сократите расходы на 15-20% и не нанимайте сотрудников.");
  }

  if (metrics.marketingBudget < 50000 && metrics.users < 500) {
    items.push("Рост аудитории слабый. Увеличьте маркетинг на 15-20%.");
  } else if (metrics.marketingBudget > metrics.revenue && metrics.month > 4) {
    items.push("Маркетинг выше выручки. Снизьте маркетинговый бюджет на 15-25%.");
  }

  if (metrics.ratio < 1) {
    items.push("LTV/CAC ниже 1. Увеличьте вложения в продукт на 20% или снизьте маркетинг на 15%.");
  } else if (metrics.ratio >= 3 && metrics.profit > 0) {
    items.push("Привлечение окупается. Можно увеличить маркетинг на 10-15%.");
  }

  if (metrics.productInvestment === 0) {
    items.push("Продукт не развивается. Добавьте вложения в продукт 50 000-80 000 ₽.");
  } else if (metrics.productInvestment > 150000 && metrics.profit < 0) {
    items.push("Вложения в продукт слишком высокие. Снизьте их на 20–30%.");
  }

  if (metrics.hireCount >= 2 && metrics.users < 500) {
    items.push("Найм слишком быстрый. Не нанимайте больше 1 сотрудника за месяц.");
  } else if (metrics.hireCount > 0 && metrics.productInvestment === 0) {
    items.push("После найма добавьте вложения в продукт минимум 30 000 ₽.");
  }

  if (
    metrics.priceChange > 0.15 &&
    metrics.payingUsers < metrics.previous.payingUsers * 0.9
  ) {
    items.push("Цена снижает спрос. Уменьшите цену на 5-10%.");
  } else if (
    metrics.priceChange === 0 &&
    metrics.ratio > 2 &&
    metrics.payingUsers >= metrics.previous.payingUsers
  ) {
    items.push("Спрос стабильный. Можно повысить цену на 5%.");
  }

  if (metrics.users < metrics.previous.users) {
    items.push("Аудитория уменьшается. Увеличьте маркетинг на 15% или вложения в продукт на 20%.");
  }

  if (metrics.payingUsers < metrics.previous.payingUsers) {
    items.push("Платящих пользователей стало меньше. Снизьте цену на 5% или вложите в продукт 30 000-50 000 ₽.");
  }

  if (metrics.expenses > metrics.revenue * 1.5 && metrics.revenue > 0) {
    items.push("Расходы выше выручки более чем на 50%. Сократите маркетинг или продуктовые вложения на 20%.");
  }

  if (metrics.profit > 0 && metrics.runway >= 6) {
    items.push("Стартап прибыльный. Сохраняйте стратегию и увеличивайте маркетинг не более чем на 10%.");
  }
}

  els.recommendations.innerHTML = `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function addLogEntry(metrics) {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `
    <h3>Месяц ${metrics.month} – ${getPhaseLabel(metrics.phase)}</h3>
    <p><strong>Решения:</strong> маркетинг ${formatMoney(metrics.marketingBudget)}, продукт ${formatMoney(metrics.productInvestment)}, найм ${metrics.hireCount}, цена ${metrics.priceChange > 0 ? "+" : ""}${Math.round(metrics.priceChange * 100)}%, оптимизация ${Math.round(metrics.costOptimization * 100)}%.</p>
    <p><strong>Структура расходов:</strong> зарплаты ${formatMoney(metrics.payroll)}, фиксированные расходы ${formatMoney(metrics.optimizedFixedCosts)}, маркетинг ${formatMoney(metrics.marketingBudget)}, продукт ${formatMoney(metrics.productInvestment)}.</p>
    <p><strong>Итог:</strong> пользователи ${formatNumber(metrics.users)}, платящие ${formatNumber(metrics.payingUsers)}, выручка ${formatMoney(metrics.revenue)}, расходы ${formatMoney(metrics.expenses)}.</p>
    <p><strong>Финансы:</strong> прибыль/убыток <span class="${metrics.profit >= 0 ? "positive" : "negative"}">${metrics.profit >= 0 ? "+" : ""}${formatMoney(metrics.profit)}</span>, капитал ${formatMoney(metrics.capital)}, запас времени ${Number.isFinite(metrics.runway) ? `${metrics.runway.toFixed(1)} мес.` : "∞"}.</p>
    <ul>${metrics.summary.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  els.log.prepend(entry);
}

function drawChart() {
  if (!els.chart) return;
  const canvas = els.chart;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "#d9e2ef";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i += 1) {
    const y = 20 + ((height - 40) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
  }

  if (state.history.length === 0) {
    ctx.fillStyle = "#5c6b7a";
    ctx.font = "16px Arial";
    ctx.fillText("График появится после запуска симуляции", 70, height / 2);
    return;
  }

  const values = state.history.map((item) => item.capital);

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const padding = Math.max((maxValue - minValue) * 0.15, 100000);

  const max = maxValue + padding;
  const min = minValue - padding;
  const range = Math.max(1, max - min);

  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 3;
  ctx.beginPath();
  state.history.forEach((item, index) => {
    const x = 40 + (index * (width - 60)) / Math.max(1, state.history.length - 1);
    const y = height - 20 - ((item.capital - min) / range) * (height - 50);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#1f2a37";
  ctx.font = "12px Arial";
  state.history.forEach((item, index) => {
    const x = 40 + (index * (width - 60)) / Math.max(1, state.history.length - 1);
    ctx.fillText(String(item.month), x - 4, height - 5);
  });
}

function startSimulation() {
  if (!validateInputs()) {
    alert("Проверьте значения: цена, CAC и остальные параметры должны быть положительными.");
    return;
  }
  readInputs();
  els.log.innerHTML = "";
  resetDecisionControls();
  els.nextBtn.disabled = false;
  const metrics = calculateMonth();
  renderMetrics(metrics);
  renderMonthSummary(metrics);
  renderRecommendations(metrics);
  addLogEntry(metrics);
  drawChart();
}

function nextMonth() {
  if (!state.initialized) {
    alert("Сначала запустите симуляцию.");
    return;
  }
  if (state.capital <= 0) {
    alert("Симуляция остановлена: капитал исчерпан.");
    return;
  }
  const metrics = calculateMonth();
  renderMetrics(metrics);
  renderMonthSummary(metrics);
  renderRecommendations(metrics);
  addLogEntry(metrics);
  drawChart();
  resetDecisionControls();
}

function resetSimulation() {
  state.initialized = false;
  state.month = 0;
  state.history = [];
  state.lastMetrics = null;
  state.investorShare = 0;
  state.investmentAlreadyRaised = false;
  els.nextBtn.disabled = true;
  els.raiseInvestment.disabled = false;
  els.log.innerHTML = "";
  els.monthSummary.textContent = "Сначала запустите симуляцию.";
  els.recommendations.textContent = "Сначала запустите симуляцию.";
  [els.mMonth, els.mPhase, els.mCapital, els.mUsers, els.mPayingUsers, els.mRevenue, els.mExpenses, els.mProfit, els.mRunway, els.mCac, els.mLtv, els.mRatio, els.mInvestorShare].forEach((node) => {
    node.textContent = "—";
    node.className = "";
  });
  resetDecisionControls();
  drawChart();
}

function openHint(key) {
  const hint = hints[key];
  if (!hint) return;
  els.hintTitle.textContent = hint.title;
  els.hintText.textContent = hint.text;
  els.hintRange.textContent = hint.range;
  els.hintModal.classList.remove("hidden");
  els.hintModal.setAttribute("aria-hidden", "false");
}

function closeHint() {
  els.hintModal.classList.add("hidden");
  els.hintModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".hint-btn").forEach((btn) => {
  btn.addEventListener("click", () => openHint(btn.dataset.hint));
});

els.closeHintModal.addEventListener("click", closeHint);
els.hintModal.addEventListener("click", (event) => {
  if (event.target === els.hintModal) closeHint();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeHint();
});

[els.marketingBudget, els.hireCount, els.productInvestment, els.priceChange, els.costOptimization].forEach((input) => {
  input.addEventListener("input", updateDecisionLabels);
});

els.startBtn.addEventListener("click", startSimulation);
els.nextBtn.addEventListener("click", nextMonth);
els.resetBtn.addEventListener("click", resetSimulation);

updateDecisionLabels();
drawChart();