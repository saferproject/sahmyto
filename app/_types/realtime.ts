export interface RealtimeNotification {
  id: string | number;
  type: string;
  content: string;
  karboom_id: number | null;
  actor_id?: number | null;
  data?: Record<string, unknown> | null;
  seen: boolean | number;
  created_at: string;
}

export interface KarboomActivity {
  karboom_id: number;
  type: string;
  subject_id: number | null;
}

export interface Announcement {
  title: string;
  message: string;
}
