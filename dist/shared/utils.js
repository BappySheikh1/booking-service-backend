"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (existingSlots, newSlot) => {
    for (const slot of existingSlots) {
        const existingStart = new Date(`${slot.date}T${slot.startTime}:00`);
        const existingEnd = new Date(`${slot.date}T${slot.endTime}:00`);
        const newStart = new Date(`${newSlot.date}T${newSlot.startTime}:00`);
        const newEnd = new Date(`${newSlot.date}T${newSlot.endTime}:00`);
        if (newStart < existingEnd && newEnd > existingStart) {
            return true;
        }
    }
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
