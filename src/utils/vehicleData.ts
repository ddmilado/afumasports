
export interface VehicleData {
  year: string;
  makes: string[];
  models: { [make: string]: string[] };
}

export const vehicleData: VehicleData = {
  year: '',
  makes: [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Nissan',
    'Hyundai',
    'Kia',
    'Mazda',
    'Subaru',
    'Lexus',
    'Acura',
    'Infiniti',
    'Jeep',
    'Dodge',
    'Chrysler',
    'Cadillac'
  ],
  models: {
    'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Sienna', 'Avalon'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline'],
    'Ford': ['F-150', 'Escape', 'Explorer', 'Focus', 'Fusion', 'Edge', 'Expedition', 'Mustang'],
    'Chevrolet': ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe', 'Cruze', 'Impala', 'Suburban'],
    'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', 'X7', '4 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC', 'A-Class', 'GLS', 'CLA'],
    'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3', 'A8', 'Q8'],
    'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Beetle', 'Arteon', 'ID.4'],
    'Nissan': ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Murano', 'Maxima', 'Armada', 'Versa'],
    'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent', 'Palisade', 'Kona', 'Genesis'],
    'Kia': ['Optima', 'Sorento', 'Sportage', 'Forte', 'Soul', 'Telluride', 'Rio', 'Stinger'],
    'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'CX-3', 'MX-5', 'CX-30', 'CX-50'],
    'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'Crosstrek', 'Ascent', 'WRX', 'BRZ'],
    'Lexus': ['ES', 'RX', 'NX', 'GX', 'LS', 'IS', 'LX', 'UX'],
    'Acura': ['TLX', 'MDX', 'RDX', 'ILX', 'NSX', 'TL', 'TSX', 'RL'],
    'Infiniti': ['Q50', 'QX60', 'QX80', 'Q60', 'QX50', 'Q70', 'QX30', 'G37'],
    'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Patriot', 'Liberty'],
    'Dodge': ['Charger', 'Challenger', 'Durango', 'Journey', 'Ram 1500', 'Avenger', 'Caravan', 'Dart'],
    'Chrysler': ['300', 'Pacifica', 'Town & Country', 'Sebring', 'Aspen', '200', 'Crossfire', 'PT Cruiser'],
    'Cadillac': ['Escalade', 'XT5', 'CT6', 'ATS', 'CTS', 'SRX', 'XTS', 'XT4']
  }
};

export const getYearOptions = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];
  
  for (let year = currentYear; year >= 2010; year--) {
    years.push(year.toString());
  }
  
  return years;
};

export const getMakeOptions = (): string[] => {
  return vehicleData.makes.sort();
};

export const getModelOptions = (make: string): string[] => {
  return vehicleData.models[make] || [];
};
