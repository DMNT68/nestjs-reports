import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
import { headerSection } from './sections/header.section';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employercompany: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
}

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 20, 0, 60],
  },

  body: {
    margin: [0, 0, 0, 70],
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
  footer: {
    fontSize: 10,
    alignment: 'center',
    italics: true,
    margin: [10, 0, 0, 20],
  },
};

export const getEmplymentLetterByIdReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employercompany,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      showLogo: true,
      showDate: true,
    }),
    content: [
      { text: 'CONSTANCIA DE EMPLEO', style: 'header' },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employercompany}, por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYYY(employeeStartDate)}.\n\n
        Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente`,
        style: 'signature',
      },
      { text: `${employerName}`, style: 'signature' },
      { text: `${employerPosition}`, style: 'signature' },
      { text: `${employercompany}`, style: 'signature' },
      { text: `${DateFormatter.getDDMMYYYY(new Date())}`, style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      style: 'footer',
    },
  };

  return docDefinition;
};
