import { type User, type InsertUser, type Dictionary, type InsertDictionary } from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dictionary methods
  getDictionary(id: string): Promise<Dictionary | undefined>;
  searchDictionaries(query: string, dictionaryType?: string): Promise<Dictionary[]>;
  getAllDictionaries(dictionaryType?: string): Promise<Dictionary[]>;
  createDictionary(dictionary: InsertDictionary): Promise<Dictionary>;
  updateDictionary(id: string, dictionary: Partial<InsertDictionary>): Promise<Dictionary | undefined>;
  deleteDictionary(id: string): Promise<boolean>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private dictionaries: Map<string, Dictionary>;
  public sessionStore: any;

  constructor() {
    this.users = new Map();
    this.dictionaries = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Initialize with admin user
    this.initializeData();
  }

  private async initializeData() {
    // Create admin user with simple password for demo
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin123@gmail.com", 
      password: "admin123", // Simple password for demo
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Initialize comprehensive dictionary data
    const sampleWords: InsertDictionary[] = [
      // KBBI Words
      {
        word: "rumah",
        type: "kata benda",
        pronunciation: "/ru·mah/",
        definition: "Bangunan untuk tempat tinggal manusia atau keluarga",
        example: "Rumah kami terletak di pinggir kota",
        synonyms: ["hunian", "tempat tinggal", "kediaman"],
        dictionary_type: "kbbi"
      },
      {
        word: "kehidupan",
        type: "kata benda",
        pronunciation: "/ke·hi·dup·an/",
        definition: "Keadaan atau hal hidup; segala sesuatu yang hidup",
        example: "Kehidupan di kota besar sangat sibuk",
        synonyms: ["hidup", "eksistensi", "keberadaan"],
        dictionary_type: "kbbi"
      },
      {
        word: "makan",
        type: "kata kerja",
        pronunciation: "/ma·kan/",
        definition: "Memasukkan makanan ke dalam mulut serta mengunyah dan menelannya",
        example: "Kami makan siang bersama keluarga",
        synonyms: ["santap", "konsumsi", "lahap"],
        dictionary_type: "kbbi"
      },
      {
        word: "belajar",
        type: "kata kerja",
        pronunciation: "/be·la·jar/",
        definition: "Berusaha memperoleh kepandaian atau ilmu",
        example: "Adik sedang belajar matematika",
        synonyms: ["menuntut ilmu", "bersekolah", "mengkaji"],
        dictionary_type: "kbbi"
      },
      {
        word: "sekolah",
        type: "kata benda",
        pronunciation: "/se·ko·lah/",
        definition: "Bangunan atau lembaga untuk belajar dan mengajar",
        example: "Sekolah kami memiliki perpustakaan yang bagus",
        synonyms: ["madrasah", "institusi pendidikan", "akademi"],
        dictionary_type: "kbbi"
      },
      {
        word: "air",
        type: "kata benda", 
        pronunciation: "/a·ir/",
        definition: "Cairan jernih tidak berwarna, tidak berasa, dan tidak berbau",
        example: "Air sangat penting untuk kehidupan",
        synonyms: ["aqua", "cairan", "fluida"],
        dictionary_type: "kbbi"
      },
      // English Words
      {
        word: "love",
        type: "noun",
        pronunciation: "/lʌv/",
        definition: "An intense feeling of deep affection",
        example: "A mother's love for her children",
        synonyms: ["affection", "adoration", "devotion"],
        dictionary_type: "english"
      },
      {
        word: "beautiful",
        type: "adjective", 
        pronunciation: "/ˈbjuːtɪfʊl/",
        definition: "Pleasing the senses or mind aesthetically",
        example: "She looked beautiful in her wedding dress",
        synonyms: ["lovely", "attractive", "gorgeous"],
        dictionary_type: "english"
      },
      {
        word: "house",
        type: "noun",
        pronunciation: "/haʊs/",
        definition: "A building for human habitation",
        example: "They bought a new house in the suburbs",
        synonyms: ["home", "dwelling", "residence"],
        dictionary_type: "english"
      },
      {
        word: "learn",
        type: "verb",
        pronunciation: "/lɜːrn/",
        definition: "Acquire knowledge or skills through study or experience",
        example: "Children learn quickly when they are interested",
        synonyms: ["study", "acquire", "master"],
        dictionary_type: "english"
      },
      {
        word: "water",
        type: "noun",
        pronunciation: "/ˈwɔːtər/",
        definition: "A colorless, transparent, odorless liquid",
        example: "Drink plenty of water every day",
        synonyms: ["H2O", "liquid", "fluid"],
        dictionary_type: "english"
      },
      {
        word: "school",
        type: "noun",
        pronunciation: "/skuːl/",
        definition: "An institution for educating children",
        example: "She teaches at the local elementary school",
        synonyms: ["academy", "college", "institute"],
        dictionary_type: "english"
      },
      // Tesaurus Words
      {
        word: "cantik",
        type: "kata sifat",
        pronunciation: "/can·tik/",
        definition: "Elok; molek; indah",
        example: "Gadis itu sangat cantik",
        synonyms: ["jelita", "ayu", "rupawan", "molek", "elok"],
        dictionary_type: "tesaurus"
      },
      {
        word: "pintar",
        type: "kata sifat", 
        pronunciation: "/pin·tar/",
        definition: "Pandai; cerdas; cakap",
        example: "Anak itu sangat pintar dalam matematika",
        synonyms: ["cerdas", "pandai", "bijak", "cakap", "genius"],
        dictionary_type: "tesaurus"
      },
      {
        word: "baik",
        type: "kata sifat",
        pronunciation: "/ba·ik/",
        definition: "Elok; patut; teratur",
        example: "Dia memiliki hati yang baik",
        synonyms: ["bagus", "elok", "indah", "patut", "tepat"],
        dictionary_type: "tesaurus"
      },
      {
        word: "besar",
        type: "kata sifat",
        pronunciation: "/be·sar/",
        definition: "Lebih dari ukuran sedang; luas",
        example: "Rumah itu sangat besar",
        synonyms: ["luas", "lebar", "agung", "raya", "akbar"],
        dictionary_type: "tesaurus"
      }
    ];

    for (const word of sampleWords) {
      const dictionary: Dictionary = {
        id: randomUUID(),
        word: word.word,
        type: word.type,
        pronunciation: word.pronunciation || null,
        definition: word.definition,
        example: word.example || null,
        synonyms: word.synonyms || null,
        dictionary_type: word.dictionary_type,
        createdAt: new Date(),
      };
      this.dictionaries.set(dictionary.id, dictionary);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Dictionary methods
  async getDictionary(id: string): Promise<Dictionary | undefined> {
    return this.dictionaries.get(id);
  }

  async searchDictionaries(query: string, dictionaryType?: string): Promise<Dictionary[]> {
    const allDictionaries = Array.from(this.dictionaries.values());
    const filtered = allDictionaries.filter(dict => {
      const matchesType = !dictionaryType || dict.dictionary_type === dictionaryType;
      const matchesQuery = dict.word.toLowerCase().includes(query.toLowerCase()) ||
                          dict.definition.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
    
    // Sort by relevance (exact matches first, then partial matches)
    return filtered.sort((a, b) => {
      const aExact = a.word.toLowerCase() === query.toLowerCase();
      const bExact = b.word.toLowerCase() === query.toLowerCase();
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return a.word.localeCompare(b.word);
    });
  }

  async getAllDictionaries(dictionaryType?: string): Promise<Dictionary[]> {
    const allDictionaries = Array.from(this.dictionaries.values());
    if (!dictionaryType) return allDictionaries;
    
    return allDictionaries.filter(dict => dict.dictionary_type === dictionaryType);
  }

  async createDictionary(insertDictionary: InsertDictionary): Promise<Dictionary> {
    const id = randomUUID();
    const dictionary: Dictionary = {
      id,
      word: insertDictionary.word,
      type: insertDictionary.type,
      pronunciation: insertDictionary.pronunciation || null,
      definition: insertDictionary.definition,
      example: insertDictionary.example || null,
      synonyms: insertDictionary.synonyms || null,
      dictionary_type: insertDictionary.dictionary_type,
      createdAt: new Date(),
    };
    this.dictionaries.set(id, dictionary);
    return dictionary;
  }

  async updateDictionary(id: string, updates: Partial<InsertDictionary>): Promise<Dictionary | undefined> {
    const existing = this.dictionaries.get(id);
    if (!existing) return undefined;

    const updated: Dictionary = {
      ...existing,
      word: updates.word ?? existing.word,
      type: updates.type ?? existing.type,
      pronunciation: updates.pronunciation ?? existing.pronunciation,
      definition: updates.definition ?? existing.definition,
      example: updates.example ?? existing.example,
      synonyms: updates.synonyms ?? existing.synonyms,
      dictionary_type: updates.dictionary_type ?? existing.dictionary_type,
    };
    this.dictionaries.set(id, updated);
    return updated;
  }

  async deleteDictionary(id: string): Promise<boolean> {
    return this.dictionaries.delete(id);
  }
}

export const storage = new MemStorage();
