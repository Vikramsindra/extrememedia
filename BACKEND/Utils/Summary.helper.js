
const summaryHelper = (rows) => {
    const map = {};

    rows.forEach((r) => {
        // ✅ GROUP ONLY BY BATCH + LOT
        const key = `${r.batchNo}_${r.lotNo}`;

        if (!map[key]) {
            map[key] = {
                tranDate: r.tranDate,
                batchNo: r.batchNo,
                lotNo: r.lotNo,
                receivedQty: 0,
                dispatchQty: 0,
                returnQty: 0,
                reDispatchQty: 0,
            };
        }

        if (r.tranType === "IN") map[key].receivedQty += r.qty;
        if (r.tranType === "DISPATCH") map[key].dispatchQty += r.qty;
        if (r.tranType === "RETURN") map[key].returnQty += r.qty;
        if (r.tranType === "REPAIR_DISPATCH")
            map[key].reDispatchQty += r.qty;
    });

    const summary = Object.values(map).map((r) => {
        const balanceQty =
            r.receivedQty -
            r.dispatchQty +
            r.returnQty -
            r.reDispatchQty;

        const returnPercent =
            r.dispatchQty > 0
                ? Math.round((r.returnQty / r.dispatchQty) * 100)
                : 0;

        return {
            ...r,
            balanceQty,
            returnPercent: `${returnPercent}%`,
        };
    });

    return summary;
}

const totalSummary = (rows) => {
    const batchMap = {};

    let receivedQty = 0;
    let returnQty = 0;
    let dispatchQty = 0;
    let reDispatchQty = 0;

    rows.forEach((r) => {
        const batchKey = r.batchNo;

        if (!batchMap[batchKey]) {
            batchMap[batchKey] = {
                batch: r.batchNo,
                received: 0,
                dispatch: 0,
                return: 0,
                reDispatch: 0,
            };
        }

        switch (r.tranType) {
            case "IN":
                batchMap[batchKey].received += r.qty;
                receivedQty += r.qty;
                break;

            case "DISPATCH":
                batchMap[batchKey].dispatch += r.qty;
                dispatchQty += r.qty;
                break;

            case "RETURN":
                batchMap[batchKey].return += r.qty;
                returnQty += r.qty;
                break;

            case "REPAIR_DISPATCH":
                batchMap[batchKey].reDispatch += r.qty;
                reDispatchQty += r.qty;
                break;
        }
    });

    // ✅ Batch-wise summary
    const batchSummary = Object.values(batchMap)
        .sort((a, b) => a.batch.localeCompare(b.batch))
        .map((b) => {
            const balance =
                b.received - b.dispatch + b.return - b.reDispatch;

            const returnPercent =
                b.dispatch > 0
                    ? Math.round((b.return / b.dispatch) * 100)
                    : 0;

            return {
                ...b,
                balance,
                returnPercent: `${returnPercent}%`,
            };
        });

    // ✅ Summary panel
    const totalInQty = receivedQty + returnQty;
    const totalAvailableQty =
        totalInQty - dispatchQty - reDispatchQty;

    const summaryPanel = {
        receivedQty,
        returnQty,
        dispatchQty,
        reDispatchQty,
        totalAvailableQty,
    };

    return { summaryPanel, batchSummary };
}

module.exports = { summaryHelper, totalSummary }