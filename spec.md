# Odoo Contact-Tag Module Specification

## 1. Introduction

This module extends the functionality of Odoo Version 16 by adding the feature to list all contacts related to a specific contact tag.

## 2. General Description

The module provides two primary functionalities:

- **Contact-Tag Listing:** For a selected contact-tag under `Contacts > Configuration > Tags`, the module will list all contacts associated with that tag.
- ~**Multiple Edit (Odoo standard feature):** It allows users to multi-select contacts from the resulting list and edit their tags simultaneously.~

## 3. Specific Requirements

### 3.1 Functional Requirements

1. **FR1.0 Contact-Tag Listing:** When a user selects a contact-tag, the system must list all contacts associated with that tag.
    - **FR1.1:** The system should handle multiple tags for a single contact.
    - **FR1.2:** The system should update the list in real-time when a new contact is tagged or an existing contact tag is modified.

### 3.2 Non-functional Requirements

1. **NFR1.0 Compatibility:** The module should be compatible with Odoo Version 16.
2. **NFR2.0 Performance:** The system should handle large numbers of contacts without performance degradation.
3. **NFR3.0 Usability:** The system should provide an intuitive, Odoo standard user-friendly interface.

## 4. Acceptance Criteria

1. Successful listing of all contacts associated with a selected tag.
2. Successful multi-selection and tag editing of contacts.
3. Compatibility with Odoo Version 16.
4. No degradation of performance while handling large numbers of contacts and tags.

![image](https://github.com/euroblaze/contact_tags_manager/assets/7826363/ebaef461-1018-48ed-906b-54df91a5db82)
