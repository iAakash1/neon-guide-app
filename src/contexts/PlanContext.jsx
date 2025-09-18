import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PlanContext = createContext();

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlanProvider');
  }
  return context;
};

export const PlanProvider = ({ children }) => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);
  const [currentSuggestions, setCurrentSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load plans from localStorage on mount and when user changes
  useEffect(() => {
    if (user) {
      const savedPlans = localStorage.getItem(`plans_${user.uid}`);
      if (savedPlans) {
        setPlans(JSON.parse(savedPlans));
      }
    } else {
      setPlans([]);
    }
  }, [user]);

  // Save plans to localStorage whenever plans change
  useEffect(() => {
    if (user && plans.length > 0) {
      localStorage.setItem(`plans_${user.uid}`, JSON.stringify(plans));
    }
  }, [plans, user]);

  const savePlan = async (plan) => {
    try {
      const newPlan = {
        ...plan,
        id: `plan_${Date.now()}`,
        userId: user?.uid || 'anonymous',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setPlans(prev => [...prev, newPlan]);

      // TODO: Save to Firestore when ready
      // const docRef = await addDoc(collection(db, 'plans'), newPlan);
      // console.log('Plan saved to Firestore with ID:', docRef.id);

      return newPlan;
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  };

  const updatePlan = async (planId, updates) => {
    try {
      setPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? { ...plan, ...updates, updatedAt: new Date().toISOString() }
          : plan
      ));

      // TODO: Update in Firestore when ready
      // await updateDoc(doc(db, 'plans', planId), {
      //   ...updates,
      //   updatedAt: new Date().toISOString()
      // });

    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  };

  const deletePlan = async (planId) => {
    try {
      setPlans(prev => prev.filter(plan => plan.id !== planId));

      // TODO: Delete from Firestore when ready  
      // await deleteDoc(doc(db, 'plans', planId));

    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  };

  const getPlanById = (planId) => {
    return plans.find(plan => plan.id === planId);
  };

  const value = {
    plans,
    currentQuestionnaire,
    currentSuggestions,
    loading,
    setCurrentQuestionnaire,
    setCurrentSuggestions,
    setLoading,
    savePlan,
    updatePlan,
    deletePlan,
    getPlanById
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};