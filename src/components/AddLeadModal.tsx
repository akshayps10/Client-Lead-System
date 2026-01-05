'use client';
import { useState } from 'react';
import styles from './AddLeadModal.module.scss';
import { X } from 'lucide-react';

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function AddLeadModal({ onClose, onSuccess, lead }: Props & { lead?: any }) {
    const [formData, setFormData] = useState({
        saleName: lead?.saleName || '',
        status: lead?.status || 'Open',
        amount: lead?.amount || '',
        stage: lead?.stage || 'Proposal (60%)',
        saleDate: lead?.saleDate ? new Date(lead.saleDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        nextActivity: lead?.nextActivity ? new Date(lead.nextActivity).toISOString().split('T')[0] : '',
        companyName: lead?.companyName || 'SuperCompany Ltd ASA'
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = lead ? `/api/leads/${lead.id}` : '/api/leads';
            const method = lead ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSuccess();
            } else {
                alert('Failed to save');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{lead ? 'Edit Sale' : 'Add New Sale'}</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.group}>
                        <label>Sale Name</label>
                        <input
                            required
                            value={formData.saleName}
                            onChange={e => setFormData({ ...formData, saleName: e.target.value })}
                        />
                    </div>

                    <div className={styles.group}>
                        <label>Sale Date</label>
                        <input
                            type="date"
                            required
                            value={formData.saleDate}
                            onChange={e => setFormData({ ...formData, saleDate: e.target.value })}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label>Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                <option>Open</option>
                                <option>Lost</option>
                                <option>Sold</option>
                                <option>Stalled</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label>Amount</label>
                            <input
                                type="number"
                                required
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.group}>
                            <label>Stage</label>
                            <input
                                value={formData.stage}
                                onChange={e => setFormData({ ...formData, stage: e.target.value })}
                            />
                        </div>
                        <div className={styles.group}>
                            <label>Next Activity Date</label>
                            <input
                                type="date"
                                required
                                value={formData.nextActivity}
                                onChange={e => setFormData({ ...formData, nextActivity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button type="button" onClick={onClose} className={styles.cancel}>Cancel</button>
                        <button type="submit" disabled={loading} className={styles.submit}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
