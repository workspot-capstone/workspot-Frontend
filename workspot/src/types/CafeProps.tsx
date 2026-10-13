export type CafeListProps = {
  id: number;
  rank: number;
  name: string;
  distance: number;
  address: string;
  score: number;
  tags: string[];
  imageUrl: string;
}

export type CafeListComponentProps = {
  cafes: CafeListProps[];
  onSelect: (id: number) => void;
}

export type WorkspaceStatus = '적합' | '보통' | '부적합'

export type CafeDetailProps = {
  id: number
  name: string
  distance: number
  address: string
  operatingHours: string
  phone: string
  imageUrls: string[]

  workspace: {
    noise: WorkspaceStatus
    outlet: WorkspaceStatus
    wifi: WorkspaceStatus
    atmosphere: string
    table: WorkspaceStatus
    longStay: WorkspaceStatus
  }

  recommendation: {
    score: number
    reason: string
  }
}