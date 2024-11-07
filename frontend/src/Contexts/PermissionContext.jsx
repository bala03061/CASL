import React, { createContext, useContext, useState, useEffect } from 'react';
import { AbilityBuilder, Ability } from '@casl/ability';

// Create a Context to store permissions
const PermissionContext = createContext();

export const usePermissions = () => useContext(PermissionContext);

// Define the permissions for a user
const defineAbilitiesFor = (permissions) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  permissions.forEach(permission => {
    const { action, resource } = permission;
    if (action === 'read') can('read', resource);
    if (action === 'create') can('create', resource);
    if (action === 'update') can('update', resource);
    if (action === 'delete') can('delete', resource);
    if (action === 'view') can('view', resource); // if 'view' is a custom action
  });

  return build();
};

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [ability, setAbility] = useState(null);

  useEffect(() => {
    // Fetch permissions from an API or from localStorage (mock example)
    const userPermissions = [
      { action: 'read', resource: 'Item' },
      { action: 'create', resource: 'Item' },
      { action: 'update', resource: 'Item' },
      { action: 'delete', resource: 'Item' }
    ];

    const userAbilities = defineAbilitiesFor(userPermissions);
    setPermissions(userPermissions);
    setAbility(userAbilities);
  }, []);

  return (
    <PermissionContext.Provider value={{ ability, permissions }}>
      {children}
    </PermissionContext.Provider>
  );
};
