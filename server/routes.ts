import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertDictionarySchema, searchSchema } from "@shared/schema";
import { z } from "zod";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Dictionary search route
  app.get("/api/search", async (req, res) => {
    try {
      const { query, dictionary_type } = searchSchema.parse(req.query);
      const results = await storage.searchDictionaries(query, dictionary_type);
      res.json(results);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid search parameters", errors: error.errors });
      }
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Get autocomplete suggestions
  app.get("/api/suggestions", async (req, res) => {
    try {
      const query = req.query.q as string;
      const dictionary_type = req.query.type as string;
      
      if (!query || query.length < 2) {
        return res.json([]);
      }

      const results = await storage.searchDictionaries(query, dictionary_type);
      const suggestions = results.slice(0, 5).map(dict => ({
        word: dict.word,
        type: dict.type,
        dictionary_type: dict.dictionary_type
      }));
      
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get suggestions" });
    }
  });

  // Admin dictionary management routes
  app.get("/api/admin/dictionaries", requireAuth, async (req, res) => {
    try {
      const dictionary_type = req.query.type as string;
      const search = req.query.search as string;
      
      let dictionaries = await storage.getAllDictionaries(dictionary_type);
      
      if (search) {
        dictionaries = dictionaries.filter(dict => 
          dict.word.toLowerCase().includes(search.toLowerCase()) ||
          dict.definition.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      res.json(dictionaries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dictionaries" });
    }
  });

  app.post("/api/admin/dictionaries", requireAuth, async (req, res) => {
    try {
      const dictionaryData = insertDictionarySchema.parse(req.body);
      const dictionary = await storage.createDictionary(dictionaryData);
      res.status(201).json(dictionary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid dictionary data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create dictionary entry" });
    }
  });

  app.put("/api/admin/dictionaries/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertDictionarySchema.partial().parse(req.body);
      const dictionary = await storage.updateDictionary(id, updates);
      
      if (!dictionary) {
        return res.status(404).json({ message: "Dictionary entry not found" });
      }
      
      res.json(dictionary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid dictionary data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update dictionary entry" });
    }
  });

  app.delete("/api/admin/dictionaries/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteDictionary(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Dictionary entry not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete dictionary entry" });
    }
  });

  // XML Sitemap generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const dictionaries = await storage.getAllDictionaries();
      const baseUrl = `https://${req.get('host') || 'localhost:5000'}`;
      
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms-conditions</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;

      // Add dictionary words to sitemap
      for (const dict of dictionaries.slice(0, 1000)) { // Limit for performance
        sitemap += `
  <url>
    <loc>${baseUrl}/word/${encodeURIComponent(dict.word)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }

      sitemap += `
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      res.status(500).send('Failed to generate sitemap');
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // In a real app, this would send an email or save to database
      console.log("Contact form submission:", { name, email, message });
      
      res.json({ message: "Pesan berhasil dikirim. Terima kasih!" });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengirim pesan" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
