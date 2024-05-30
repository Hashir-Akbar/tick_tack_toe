"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Service {
  id: string;
  title: string;
  description: string;
}

interface Log {
  id: string;
  product: string;
  date: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchServices();
  }, []);

  const logServiceClick = async (serviceId: string) => {
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID for the log
      product: serviceId,
      date: new Date().toLocaleString(),
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);

    try {
      await fetch('http://localhost:8080/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog),
      });
    } catch (error) {
      console.error('Error logging the data:', error);
    }
  };

  const toggleService = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
      logServiceClick(id);
    }
  };

  return (
    <div className="grid-container">
      <div className="content">
        <Navbar />
        <main className="main-section">
          <h1>This is the Services page</h1>
          <p>Select the services you are interested in:</p>
          <div>
            {services.map((service: Service) => (
              <div key={service.id} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
                <h2 onClick={() => toggleService(service.id)}>{service.title}</h2>
                {expandedService === service.id && <p>{service.description}</p>}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Services;