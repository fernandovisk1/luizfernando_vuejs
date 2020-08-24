export default function dateFilter(value, type = 'datetime') {
    if (!value) return '';
    
    const  date = new Date(value);
    if (!date.getTime()) return value;

    switch (type) {
        case 'date':
            return date.toLocaleDateString();

        case 'time':
            return date.toLocaleTimeString();

        default:
            return date.toLocaleTimeString();
    }
}