import { NextResponse } from 'next/server';
import { updateLead, deleteLead } from '@/lib/db';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteLead(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete lead', details: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const lead = await updateLead(id, body);

        if (!lead) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        return NextResponse.json(lead);
    } catch (error: any) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update lead', details: error.message }, { status: 500 });
    }
}
