'use client';

import { useState, useEffect } from 'react';
import styles from './SalesTable.module.scss';
import { Plus, Trash2, Filter, Download, RotateCw, Edit2 } from 'lucide-react';
import AddLeadModal from './AddLeadModal';

type Lead = {
    id: string;
    saleName: string;
    status: string; // Open, Lost, Sold, Stalled
    amount: number;
    stage: string;
    saleDate: string;
    nextActivity: string;
    createdAt: string;
};

export default function SalesTable() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

    // Pagination & Tabs
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState('Sales');

    const fetchLeads = async (pageNo = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/leads?page=${pageNo}&limit=10`);
            if (res.ok) {
                const data = await res.json();
                setLeads(data.leads);
                setTotalPages(data.totalPages);
                setPage(data.page);
            }
        } catch (error) {
            console.error('Failed to fetch leads', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'Sales') {
            fetchLeads(page);
        }
    }, [page, activeTab]);

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleDelete = async () => {
        if (selectedIds.size === 0) return;
        if (!confirm('Are you sure you want to delete selected items?')) return;

        for (const id of Array.from(selectedIds)) {
            try {
                await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            } catch (error) {
                console.error('Failed to delete', id, error);
            }
        }
        setSelectedIds(new Set());
        fetchLeads();
    };

    const handleEdit = () => {
        if (selectedIds.size !== 1) return;
        const id = Array.from(selectedIds)[0];
        const lead = leads.find(l => l.id === id);
        if (lead) {
            setEditingLead(lead);
            setIsModalOpen(true);
        }
    };

    const openAddModal = () => {
        setEditingLead(undefined);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase();
        let className = styles.badge;
        if (s === 'open') className += ` ${styles.open}`;
        else if (s === 'lost') className += ` ${styles.lost}`;
        else if (s === 'sold') className += ` ${styles.sold}`;
        else if (s === 'stalled') className += ` ${styles.stalled}`;

        return <span className={className}>{status}</span>;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-GB'); // DD/MM/YYYY
    };

    const formatCurrency = (amount: number) => {
        // Using USD for now based on design symbol genericness, though text says EUR in another place. Design shows €, stick to that? Design shows "17,344.00"
        // Design has € symbol in one row, but 17 344 EUR in right panel. Let's use format with space.
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {['Activities', 'Contacts', 'Projects', 'Sales', 'Requests'].map(tab => (
                    <span
                        key={tab}
                        className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {activeTab === 'Sales' ? (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ width: 40 }}></th>
                                    <th>Status</th>
                                    <th>Sale date</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                    <th>Stage</th>
                                    <th>Next activity</th>
                                    <th>Added Date</th>
                                    <th>Sale name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id} className={selectedIds.has(lead.id) ? styles.selected : ''} onClick={() => toggleSelection(lead.id)}>
                                        <td className={styles.checkboxCell}>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(lead.id)}
                                                readOnly
                                            />
                                        </td>
                                        <td data-label="Status">{getStatusBadge(lead.status)}</td>
                                        <td data-label="Sale date" suppressHydrationWarning>{formatDate(lead.saleDate)}</td>
                                        <td data-label="Amount" style={{ textAlign: 'right' }} suppressHydrationWarning>{formatCurrency(lead.amount)}</td>
                                        <td data-label="Stage">{lead.stage}</td>
                                        <td data-label="Next activity" suppressHydrationWarning>{formatDate(lead.nextActivity)}</td>
                                        <td data-label="Added Date" suppressHydrationWarning>{formatDate(lead.createdAt)}</td>
                                        <td data-label="Sale name">{lead.saleName}</td>
                                    </tr>
                                ))}
                                {leads.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No sales found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    <div className={styles.pagination}>
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    Content for {activeTab}
                </div>
            )}

            <div className={styles.actions}>
                <button className={styles.addBtn} onClick={openAddModal}>
                    <Plus size={16} /> Add
                </button>
                <button className={styles.actionBtn} onClick={handleDelete} disabled={selectedIds.size === 0}>
                    <Trash2 size={16} /> Delete
                </button>
                <button className={styles.actionBtn} onClick={handleEdit} disabled={selectedIds.size !== 1}>
                    <Edit2 size={16} /> Edit
                </button>
                <button className={styles.actionBtn}>
                    <Filter size={16} /> Filter
                </button>
                <button className={styles.actionBtn}>
                    <Download size={16} /> Export
                </button>

                <div style={{ flex: 1 }}></div>
                <button className={styles.refreshBtn} onClick={() => fetchLeads(page)}>
                    <RotateCw size={16} />
                </button>
            </div>

            {isModalOpen && (
                <AddLeadModal
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => { setIsModalOpen(false); fetchLeads(page); }}
                    lead={editingLead}
                />
            )}
        </div>
    );
}
