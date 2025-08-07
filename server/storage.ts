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
    // Create admin user
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin123@gmail.com",
      password: "$scrypt$N=16384,r=8,p=1$aGFzaHNhbHQ$hashedpassword", // This will be properly hashed in auth.ts
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Initialize sample dictionary data
    const sampleWords: InsertDictionary[] = [
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
        word: "kehidupan",
        type: "kata benda",
        pronunciation: "/ke·hi·dup·an/",
        definition: "Keadaan atau hal hidup; segala sesuatu yang hidup",
        example: "Kehidupan di kota besar sangat sibuk",
        synonyms: ["hidup", "eksistensi", "keberadaan"],
        dictionary_type: "kbbi"
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
