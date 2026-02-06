export async function AggregateTotal(
  model,
  amountField: string,
  dateField: string,
  from: Date,
  to: Date,
) {
  const result = await model.aggregate([
    {
      $match: {
        isDeleted: false,
        [dateField]: { $gte: from, $lte: to },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: `$${amountField}` },
      },
    },
  ]);

  return result[0]?.total || 0;
}

export function resolveDateRange(query: string) {
  const now = new Date();

  switch (query.toLowerCase()) {
    case 'today':
      return {
        from: new Date(now.setHours(0, 0, 0, 0)),
        to: new Date(now.setHours(23, 59, 59, 999)),
      };

    case 'this-week': {
      const start = new Date();
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      return { from: start, to: end };
    }

    case 'this-month':
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
      };

    case 'this-year':
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999),
      };

    default:
      throw new Error('Unsupported query');
  }
}
