export const UserTypes: { id: number; type: string; collection: string }[] = [
    { id: 1, type: 'contributor', collection: 'db.waste_contributor' },
    { id: 2, type: 'distributor', collection: 'db.waste_distributor' },
    { id: 3, type: 'company', collection: 'db.recycle_company' },
];

export const RequestStatus: { id: number; status: string; }[] = [
    { id: 1, status: 'pending' },
    { id: 2, status: 'approved' },
    { id: 3, status: 'collecting' },
    { id: 4, status: 'completed' },
    { id: 5, status: 'rejected' }
];