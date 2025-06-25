// This file exports a custom React hook as an example.

import { useState, useEffect } from 'react';

const useExample = () => {
    const [data] = useState(null);
    const [loading] = useState(true);
    const [error] = useState<unknown>(null);

    useEffect(() => {
        // NOTE: The following is a browser-only example. Commented out to avoid build errors in Node.js/SSR environments.
        /*
        const fetchData = async () => {
            try {
                const response = await fetch('/api/example'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        */
    }, []);

    return { data, loading, error };
};

export default useExample;