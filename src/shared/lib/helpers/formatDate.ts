export const formatDate = (date?: Date, withTime = true) =>
    date
        ? new Intl.DateTimeFormat('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              ...(withTime && { hour: '2-digit', minute: '2-digit' }),
          })
              .format(date)
              .replace(/\sг\.,?/, '')
        : null;
