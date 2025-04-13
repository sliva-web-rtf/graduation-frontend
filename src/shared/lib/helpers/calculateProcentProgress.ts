export function calculateProcentProgress(datesFromBackend: { title: string; start: string; end: string }[]) {
    // const curDate = new Date().toISOString()
    const curDate = '2025-01-15T11:19:20.310Z';

    const procentEveryStage = 100 / datesFromBackend.length;

    const suitableIndexOfObj = datesFromBackend.findIndex(
        (el) => Date.parse(el.start) <= Date.parse(curDate) && Date.parse(curDate) <= Date.parse(el.end),
    );

    // console.log(datesFromBackend[suitableIndexOfObj]);

    const startDay = +datesFromBackend[suitableIndexOfObj].start.substring(8, 10);
    const finishDay = +datesFromBackend[suitableIndexOfObj].end.substring(8, 10);
    const curDay = +curDate.substring(8, 10);

    const pastDays = curDay - startDay + 1;
    const generalCountDaysInPeriod = finishDay - startDay + 1;
    const procentIntoStage = (pastDays * 100) / generalCountDaysInPeriod;

    //   console.log("Прошедших дней с начала этапа - ", pastDays)
    //   console.log("Сколько вообще в этапе дней - ", generalCountDaysInPeriod)
    //   console.log("Прогресс относительно этапа - ", procentIntoStage)

    const procentIntoAllLinearProgress =
        procentIntoStage / datesFromBackend.length + procentEveryStage * suitableIndexOfObj;

    // console.log('Процент от общего числа - ', procentIntoAllLinearProgress);

    return procentIntoAllLinearProgress;
}
