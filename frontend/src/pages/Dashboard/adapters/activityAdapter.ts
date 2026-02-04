export interface ActivityItem {
    id: string;
    type: 'missed_call' | 'message' | 'reaction';
    user: {
        name: string;
        avatar?: string;
        initials?: string;
    };
    content: string;
    timestamp: string;
    isRead: boolean;
    meta?: {
        groupName?: string;
    };
}

// Mock data adapter simulating API response transformation
export const getRecentActivity = (): ActivityItem[] => [
    {
        id: '1',
        type: 'missed_call',
        user: { name: 'Sarah Jenkins', initials: 'SJ' },
        content: 'Sarah tried to reach you for the Weekly Sync.',
        timestamp: '2m ago',
        isRead: false
    },
    {
        id: '2',
        type: 'message',
        user: { name: 'Design Sync', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoB-l54Mm6-SbOuh8vJ5_mWi2zl4GkCTkE2HCTUeDmBAx9lNtwsF8X0b699QPypQgHET1pn7ZKUpMTD9jXvWJB-DtZQZEYLKD_DAKmrV-Z8NL_yEoYHM5hX00F8K3SKhbVlDlbR5R4eGjEbcvrSwfc0BH_jtqkN3J2aL-qb-M7arZbkb1_zcF5FB2Xrgs8Cnh9a8F97o3aXuJa1pqf3ArRRvw_LFH6fUk8axgtRpCl1k1iqbsRWXaJLcY9I5lUKCYPlbJpRXFQW1U' },
        content: '"Hey Alex, can you review the latest Figma prototypes for the mobile..."',
        timestamp: '15m ago',
        isRead: false,
        meta: { groupName: 'Design Sync' }
    },
    {
        id: '3',
        type: 'reaction',
        user: { name: 'Mike Ross' },
        content: 'In group: Technical Architecture',
        timestamp: '1h ago',
        isRead: true
    }
];
