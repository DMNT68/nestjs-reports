import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subtitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;

  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? {
        text: title,
        alignment: 'center',

        style: {
          bold: true,
          alignment: 'center',
        },
      }
    : null;
  const headerSubtitle: Content = subtitle;

  return {
    columns: [headerLogo, headerTitle, headerSubtitle, headerDate],
  };
};
