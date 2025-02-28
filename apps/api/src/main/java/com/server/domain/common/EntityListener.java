package com.server.domain.common;

import jakarta.persistence.PreUpdate;
import jakarta.persistence.PrePersist;
import java.time.LocalDateTime;

public class EntityListener {

    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setUpdatedAt(LocalDateTime.now());
    }
}