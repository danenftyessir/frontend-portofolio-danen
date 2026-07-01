/**
 * Supabase Client Utility untuk Frontend Portfolio
 * Menyediakan Supabase client instance dan type definitions
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

/**
 * Supabase client instance
 * Gunakan ini untuk semua database operations di frontend
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// ============================================
// Type Definitions
// ============================================

/**
 * Portfolio entry type
 */
export interface Portfolio {
  id: string
  category: string
  title: string
  content: string
  keywords: string[]
  created_at: string
  updated_at: string
}

/**
 * Project entry type
 */
export interface Project {
  id: string
  title: string
  description: string | null
  technologies: string[]
  image_url: string | null
  github_url: string | null
  live_url: string | null
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

/**
 * Skill entry type
 */
export interface Skill {
  id: string
  name: string
  category: string
  proficiency: number // 1-5 scale
  icon_url: string | null
  order_index: number
  created_at: string
  updated_at: string
}

/**
 * Conversation entry type
 */
export interface Conversation {
  id: number
  session_id: string
  question: string
  response: string
  message_type: string
  confidence_score: number | null
  metadata: Record<string, any>
  created_at: string
}

/**
 * Session entry type
 */
export interface Session {
  id: string
  session_data: Record<string, any>
  expires_at: string
  created_at: string
  updated_at: string
}

// ============================================
// Database helper functions
// ============================================

/**
 * Portfolio API
 */
export const portfolioAPI = {
  /**
   * Get all portfolio entries
   */
  async getAll(): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  /**
   * Get portfolio by category
   */
  async getByCategory(category: string): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  /**
   * Search portfolio by keywords
   */
  async searchByKeyword(keyword: string): Promise<Portfolio[]> {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .contains('keywords', [keyword])

    if (error) throw error
    return data || []
  },
}

/**
 * Projects API
 */
export const projectsAPI = {
  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * Get featured projects
   */
  async getFeatured(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * Get project by ID
   */
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  },
}

/**
 * Skills API
 */
export const skillsAPI = {
  /**
   * Get all skills
   */
  async getAll(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * Get skills by category
   */
  async getByCategory(category: string): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('category', category)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * Get skill categories
   */
  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('category')

    if (error) throw error

    // Extract unique categories
    const categories = Array.from(new Set(data?.map(item => item.category) || []))
    return categories
  },
}

/**
 * Conversations API (for chat functionality)
 */
export const conversationsAPI = {
  /**
   * Save a conversation
   */
  async save(
    session_id: string,
    question: string,
    response: string,
    message_type: string = 'general',
    confidence_score?: number,
    metadata?: Record<string, any>
  ): Promise<Conversation | null> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        session_id,
        question,
        response,
        message_type,
        confidence_score,
        metadata: metadata || {},
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving conversation:', error)
      return null
    }
    return data
  },

  /**
   * Get conversations for a session
   */
  async getBySession(session_id: string, limit: number = 50): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },
}

/**
 * Sessions API
 */
export const sessionsAPI = {
  /**
   * Save or update session
   */
  async save(
    id: string,
    session_data: Record<string, any>,
    expires_at: string
  ): Promise<Session | null> {
    const { data, error } = await supabase
      .from('sessions')
      .upsert({
        id,
        session_data,
        expires_at,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving session:', error)
      return null
    }
    return data
  },

  /**
   * Get session by ID
   */
  async getById(id: string): Promise<Session | null> {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  },
}

// ============================================
// Utility functions
// ============================================

/**
 * Test Supabase connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('portfolio')
      .select('id')
      .limit(1)

    return !error
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

/**
 * Real-time subscription helper
 */
export function subscribeToTable<T>(
  table: string,
  callback: (payload: T) => void,
  filter?: { column: string; value: any }
) {
  const options = filter
    ? { event: '*' as const, schema: 'public', table, filter: `${filter.column}=eq.${filter.value}` }
    : { event: '*' as const, schema: 'public', table }

  return supabase
    .channel(`table-changes-${table}`)
    .on('postgres_changes', options, (payload) => {
      callback(payload.new as T)
    })
    .subscribe()
}

/**
 * Export all APIs as a single object
 */
export const db = {
  portfolio: portfolioAPI,
  projects: projectsAPI,
  skills: skillsAPI,
  conversations: conversationsAPI,
  sessions: sessionsAPI,
}

export default supabase
