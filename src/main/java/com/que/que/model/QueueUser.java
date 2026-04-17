package com.que.model;

import com.que.enums.QueueStatus;

public class QueueUser {

    private int tokenNumber;
    private String name;
    private int priority; //lower value = higher priority
    private long joinTime;
    private QueueStatus status;

    public QueueUser(int tokenNumber, String name, int priority, QueueStatus status) {
        this.tokenNumber = tokenNumber;
        this.name = name;
        this.priority = priority;
        this.status = status;
    }

    public int getTokenNumber() {
        return tokenNumber;
    }

    public String getName() {
        return name;
    }

    public int isPriority() {
        int priority;
    }

    public QueueStatus getStatus() {
        return status;
    }

    public void setStatus(QueueStatus status) {
        this.status = status;
    }
}