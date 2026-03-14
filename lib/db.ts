// IndexedDB Service for Agricultural Data
const DB_NAME = 'FarmerAIDB';
const DB_VERSION = 1;

interface WeatherRecord {
  id?: string;
  timestamp: number;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  precipitation: number;
  uvIndex: number;
}

interface CropRecord {
  id?: string;
  timestamp: number;
  cropName: string;
  diseaseName: string;
  confidence: number;
  treatment: string;
  severity: string;
  imageData?: string;
  notes: string;
}

interface CattleRecord {
  id?: string;
  timestamp: number;
  breed: string;
  age: number;
  healthStatus: string;
  weight: number;
  lastVaccine: string;
  notes: string;
  imageData?: string;
}

interface SoilRecord {
  id?: string;
  timestamp: number;
  soilType: string;
  confidence: number;
  moisture: number;
  ph: number;
  notes: string;
  imageData?: string;
}

interface FarmDataRecord {
  id?: string;
  timestamp: number;
  dataType: string; // 'weather', 'disease', 'treatment', 'government_advisory'
  title: string;
  content: string;
  source: string;
  relevance: number;
}

let db: IDBDatabase | null = null;

export const initDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains('weather')) {
        const weatherStore = database.createObjectStore('weather', { keyPath: 'id', autoIncrement: true });
        weatherStore.createIndex('timestamp', 'timestamp', { unique: false });
        weatherStore.createIndex('location', 'location', { unique: false });
      }

      if (!database.objectStoreNames.contains('crops')) {
        const cropStore = database.createObjectStore('crops', { keyPath: 'id', autoIncrement: true });
        cropStore.createIndex('timestamp', 'timestamp', { unique: false });
        cropStore.createIndex('cropName', 'cropName', { unique: false });
      }

      if (!database.objectStoreNames.contains('cattle')) {
        const cattleStore = database.createObjectStore('cattle', { keyPath: 'id', autoIncrement: true });
        cattleStore.createIndex('timestamp', 'timestamp', { unique: false });
        cattleStore.createIndex('breed', 'breed', { unique: false });
      }

      if (!database.objectStoreNames.contains('farmData')) {
        const farmStore = database.createObjectStore('farmData', { keyPath: 'id', autoIncrement: true });
        farmStore.createIndex('timestamp', 'timestamp', { unique: false });
        farmStore.createIndex('dataType', 'dataType', { unique: false });
      }

      if (!database.objectStoreNames.contains('soil')) {
        const soilStore = database.createObjectStore('soil', { keyPath: 'id', autoIncrement: true });
        soilStore.createIndex('timestamp', 'timestamp', { unique: false });
        soilStore.createIndex('soilType', 'soilType', { unique: false });
      }
    };
  });
};

const getDB = async (): Promise<IDBDatabase> => {
  if (!db) {
    db = await initDB();
  }
  return db;
};

// Weather Operations
export const addWeatherRecord = async (record: WeatherRecord): Promise<string> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['weather'], 'readwrite');
    const store = transaction.objectStore('weather');
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as string);
    request.onerror = () => reject(request.error);
  });
};

export const getWeatherRecords = async (location?: string, days: number = 30): Promise<WeatherRecord[]> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['weather'], 'readonly');
    const store = transaction.objectStore('weather');
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;

    const request = location ? store.index('location').getAll(location) : store.getAll();

    request.onsuccess = () => {
      const records = (request.result as WeatherRecord[]).filter((r) => r.timestamp >= cutoffTime);
      resolve(records.sort((a, b) => b.timestamp - a.timestamp));
    };
    request.onerror = () => reject(request.error);
  });
};

// Crop Operations
export const addCropRecord = async (record: CropRecord): Promise<string> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['crops'], 'readwrite');
    const store = transaction.objectStore('crops');
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as string);
    request.onerror = () => reject(request.error);
  });
};

export const getCropRecords = async (days: number = 90): Promise<CropRecord[]> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['crops'], 'readonly');
    const store = transaction.objectStore('crops');
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;

    const request = store.getAll();

    request.onsuccess = () => {
      const records = (request.result as CropRecord[]).filter((r) => r.timestamp >= cutoffTime);
      resolve(records.sort((a, b) => b.timestamp - a.timestamp));
    };
    request.onerror = () => reject(request.error);
  });
};

// Cattle Operations
export const addCattleRecord = async (record: CattleRecord): Promise<string> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['cattle'], 'readwrite');
    const store = transaction.objectStore('cattle');
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as string);
    request.onerror = () => reject(request.error);
  });
};

export const getCattleRecords = async (): Promise<CattleRecord[]> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['cattle'], 'readonly');
    const store = transaction.objectStore('cattle');
    const request = store.getAll();

    request.onerror = () => reject(request.error);
  });
};

// Soil Operations
export const addSoilRecord = async (record: SoilRecord): Promise<string> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['soil'], 'readwrite');
    const store = transaction.objectStore('soil');
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as string);
    request.onerror = () => reject(request.error);
  });
};

export const getSoilRecords = async (days: number = 365): Promise<SoilRecord[]> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['soil'], 'readonly');
    const store = transaction.objectStore('soil');
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;
    const request = store.getAll();

    request.onsuccess = () => {
      const records = (request.result as SoilRecord[]).filter((r) => r.timestamp >= cutoffTime);
      resolve(records.sort((a, b) => b.timestamp - a.timestamp));
    };
    request.onerror = () => reject(request.error);
  });
};

// Farm Data Operations
export const addFarmDataRecord = async (record: FarmDataRecord): Promise<string> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['farmData'], 'readwrite');
    const store = transaction.objectStore('farmData');
    const request = store.add(record);

    request.onsuccess = () => resolve(request.result as string);
    request.onerror = () => reject(request.error);
  });
};

export const getFarmDataRecords = async (dataType?: string): Promise<FarmDataRecord[]> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['farmData'], 'readonly');
    const store = transaction.objectStore('farmData');

    const request = dataType ? store.index('dataType').getAll(dataType) : store.getAll();

    request.onsuccess = () => {
      const records = request.result as FarmDataRecord[];
      resolve(records.sort((a, b) => b.timestamp - a.timestamp));
    };
    request.onerror = () => reject(request.error);
  });
};

export const clearOldData = async (): Promise<void> => {
  const database = await getDB();
  const cutoffTime = Date.now() - 90 * 24 * 60 * 60 * 1000;

  const transaction = database.transaction(['weather', 'crops', 'cattle', 'farmData', 'soil'], 'readwrite');

  ['weather', 'crops', 'cattle', 'farmData', 'soil'].forEach((storeName) => {
    const store = transaction.objectStore(storeName);
    const index = store.index('timestamp');
    const range = IDBKeyRange.upperBound(cutoffTime);
    index.openCursor(range).onsuccess = (e) => {
      const cursor = (e.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };
  });
};
