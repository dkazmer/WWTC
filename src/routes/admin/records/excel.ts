// https://stackoverflow.com/a/52948276
export const myExcelXML = (() => {
	let Workbook = '',
		WorkbookStart =
			'<?xml version="1.0"?><ss:Workbook  xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">';
	const WorkbookEnd = '</ss:Workbook>';
	let fs: string,
		SheetName = 'SHEET 1',
		styleID = 1,
		columnWidth = 80,
		fileName = 'members',
		uri: string,
		link: HTMLAnchorElement;

	class myExcelXML {
		constructor(o: string | Obj) {
			const respArray = typeof o === 'string' ? JSON.parse(o) : o;
			const finalDataArray = [];

			for (let i = 0; i < respArray.length; i++) {
				finalDataArray.push(flatten(respArray[i]));
			}

			const s = JSON.stringify(finalDataArray);
			fs = s.replace(/&/gi, '&amp;');
		}

		downLoad() {
			const Worksheet = myXMLWorkSheet(SheetName, fs);

			WorkbookStart += myXMLStyles(styleID);
			Workbook = WorkbookStart + Worksheet + WorkbookEnd;

			// uri = `data:text/xls;charset=utf-8,${encodeURIComponent(Workbook)}`;
			uri = `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(Workbook)}`;
			link = document.createElement('a');
			link.href = uri;
			link.style = 'visibility:hidden';
			link.download = `${fileName}.xls`;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}

		get fileName() {
			return fileName;
		}

		set fileName(n) {
			fileName = n;
		}

		get SheetName() {
			return SheetName;
		}

		set SheetName(n) {
			SheetName = n;
		}

		get styleID() {
			return styleID;
		}

		set styleID(n) {
			styleID = n;
		}
	}

	const myXMLStyles = (id: number) => {
		const Styles = `<ss:Styles><ss:Style ss:ID="${id}"><ss:Font ss:Bold="1"/></ss:Style></ss:Styles>`;
		return Styles;
	};

	const myXMLWorkSheet = (name: string, o: string) => {
		const Table = myXMLTable(o);
		const WorksheetStart = `<ss:Worksheet ss:Name="${name}">`;
		const WorksheetEnd = '</ss:Worksheet>';

		return WorksheetStart + Table + WorksheetEnd;
	};

	const myXMLTable = (o: string) => {
		let TableStart = '<ss:Table>';
		const TableEnd = '</ss:Table>';
		const tableData: Obj = JSON.parse(o);

		if (tableData.length > 0) {
			const columnHeader = Object.keys(tableData[0]);
			let rowData = '';

			for (let i = 0; i < columnHeader.length; i++) {
				TableStart += myXMLColumn(columnWidth);
			}

			for (let j = 0; j < tableData.length; j++) {
				rowData += myXMLRow(tableData[j], columnHeader);
			}

			TableStart += myXMLHead(1, columnHeader);
			TableStart += rowData;
		}

		return TableStart + TableEnd;
	};

	const myXMLColumn = (w: number) => {
		return `<ss:Column ss:AutoFitWidth="0" ss:Width="${w}"/>`;
	};

	const myXMLHead = (id: number, h: string[]) => {
		let HeadStart = `<ss:Row ss:StyleID="${id}">`;
		const HeadEnd = '</ss:Row>';

		for (let i = 0; i < h.length; i++) {
			const Cell = myXMLCell(h[i].toUpperCase());
			HeadStart += Cell;
		}

		return HeadStart + HeadEnd;
	};

	const myXMLRow = (r: Obj, h: string[]) => {
		let RowStart = '<ss:Row>';
		const RowEnd = '</ss:Row>';

		for (let i = 0; i < h.length; i++) {
			const Cell = myXMLCell(r[h[i]]);
			RowStart += Cell;
		}

		return RowStart + RowEnd;
	};

	const myXMLCell = (n: string) => {
		let CellStart = '<ss:Cell>';
		const CellEnd = '</ss:Cell>';

		const Data = myXMLData(n);
		CellStart += Data;

		return CellStart + CellEnd;
	};

	const myXMLData = (d: string) => {
		const DataStart = '<ss:Data ss:Type="String">';
		const DataEnd = '</ss:Data>';
		return DataStart + d + DataEnd;
	};

	const flatten = <T = Obj>(obj: T): T => {
		const obj1 = JSON.parse(JSON.stringify(obj));
		const obj2 = JSON.parse(JSON.stringify(obj));

		if (typeof obj !== 'object') return obj1;

		for (const k1 in obj2) {
			if (Object.hasOwn(obj2, k1)) {
				if (typeof obj2[k1] === 'object' && obj2[k1] !== null) {
					delete obj1[k1];

					for (const k2 in obj2[k1]) {
						if (Object.hasOwn(obj2[k1], k2)) obj1[`${k1}-${k2}`] = obj2[k1][k2];
					}
				}
			}
		}

		let hasObject = false;

		for (const key in obj1) {
			if (Object.hasOwn(obj1, key)) {
				if (typeof obj1[key] === 'object' && obj1[key] !== null) hasObject = true;
			}
		}

		return hasObject ? flatten(obj1) : obj1;
	};

	return myExcelXML;
})();

// biome-ignore lint: suspicious/noExplicitAny
type Obj = Record<string, any>;
